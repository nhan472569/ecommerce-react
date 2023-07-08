const multer = require('multer');
const User = require('./../models/user.model');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory.controller');
const cloud = require('../utils/cloudinary');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.updateCloudPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const user = await User.findById(req.user.id);
  if (user.photo !== 'avt-default.jpeg') {
    await cloud.deleteImage(user.photo); //* delete old image
  }

  req.file.filename = `user-${req.user.id}-${Date.now()}`;
  await cloud.upload(req.file.buffer, req.file.filename); // *upload new image
  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

module.exports.updateMe = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  if (password || passwordConfirm) {
    return next(new AppError('This route is not for updating password', 400));
  }
  const filterBody = filterObj(req.body, 'name', 'email');
  if (req.file) filterBody.photo = req.file.filename;

  const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.setUserParam = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

module.exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Can not find service. Please use /signup instead!',
  });
};

module.exports.getAllUsers = factory.getAll(User);
module.exports.getUser = factory.getOne(User);
// Do not change password using this controller
module.exports.updateUser = factory.updateOne(User);
module.exports.deleteUser = factory.deleteOne(User);
module.exports.getTotals = factory.getTotals(User);
