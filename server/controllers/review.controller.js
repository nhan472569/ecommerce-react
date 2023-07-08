const { default: mongoose } = require('mongoose');
const Review = require('../models/review.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory.controller');

exports.setBookAndUser = catchAsync(async (req, res, next) => {
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.validateUser = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin') return next();
  const review = await Review.findById(req.params.id);
  console.log(req.user);
  if (req.user.id === review.user._id) return next();
  return next(new AppError('You are not allowed to perform this action', 403));
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getReviewStats = catchAsync(async (req, res, next) => {
  const stats = await Review.aggregate([
    {
      $match: { book: new mongoose.Types.ObjectId(req.params.bookId) },
    },
    {
      $group: {
        _id: { $toUpper: '$rating' },
        numRatings: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: stats,
    },
  });
});
