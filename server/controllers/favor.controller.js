const { default: mongoose } = require('mongoose');
const favor = require('../models/favor.model');
const Favor = require('../models/favor.model');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory.controller');

exports.setBookAndUser = catchAsync(async (req, res, next) => {
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.getUserFavors = catchAsync(async (req, res, next) => {
  let favors = await Favor.aggregate([
    {
      $match: { user: new mongoose.Types.ObjectId(req.user.id) },
    },
    {
      $lookup: {
        from: 'books',
        localField: 'book',
        foreignField: '_id',
        as: 'book',
        pipeline: [
          {
            $project: {
              summary: 0,
              description: 0,
              images: 0,
              createdAt: 0,
              category: 0,
              createdAt: 0,
              authors: 0,
              __v: 0,
            },
          },
        ],
      },
    },
    { $unwind: '$book' },
    {
      $group: {
        _id: { $sum: 1 },
        books: { $push: '$book' },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: favors,
    },
  });
});

exports.createFavor = factory.createOne(Favor);

exports.deleteFavor = catchAsync(async (req, res, next) => {
  const doc = await Favor.findOneAndDelete({
    book: req.params.bookId,
    user: req.user.id,
  });

  if (!doc) return next(new AppError('No document found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
