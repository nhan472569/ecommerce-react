const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const User = require('.././models/user.model');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('../utils/email');

const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (newUser, statusCode, res) => {
  const token = signToken(newUser._id);
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };
  // if (process.env.NODE_ENV === 'production') {
  //   cookieOptions.sameSite = 'none';
  //   cookieOptions.secure = true;
  // }
  newUser.password = undefined;
  // res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: newUser,
    },
  });
};

module.exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // const token = signToken(newUser._id);
  createSendToken(newUser, 201, res);
  // res.status(201).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: newUser
  //   }
  // });
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!'), 400);
  }
  const user = await User.findOne({ email, active: { $ne: false } }).select(
    '+password'
  );
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(
      new AppError('Incorrect email or password. Please try again.', 401)
    );
  }
  createSendToken(user, 200, res);

  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token
  // });
});

module.exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 100),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

module.exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Check headers exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in. Please log in to access these content.',
        401
      )
    );
  }
  // Verify token (valid or not)
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // Check user in database
  const currentUser = await User.findById(decode.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token no longer exist. Please try again.',
        401
      )
    );
  }
  // Check password changed
  if (currentUser.checkChangePasswordAfter(decode.iat))
    return next(
      new AppError(
        'The user password had changed before! Please try to login again.',
        401
      )
    );
  req.user = currentUser;
  next();
});

module.exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // Verify token (valid or not)
    const decode = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    // Check user in database
    const currentUser = await User.findById(decode.id);

    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token no longer exist. Please try again.',
          401
        )
      );
    }
    // Check password changed
    if (currentUser.checkChangePasswordAfter(decode.iat))
      return next(
        new AppError(
          'The user password had changed before! Please try to login again.',
          401
        )
      );
    res.locals.user = currentUser;
  }
  return next();
});

module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You dont have permission to perform this action', 403)
      );
    }
    next();
  };
};

module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user belonging to this email.'), 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.CORS_DOMAIN}/user/resetPassword/${resetToken}`;
  const message = `Forgot your password? Please enter this URL to set your new password:\n${resetURL}.\nIf you didn't forget your password. Please ignore this email.`;
  try {
    await new Email(user, resetURL).send(
      message,
      'Your reset URL to reset your password (Valid for 10 mins)'
    );
    res.status(200).json({
      status: 'success',
      data: {
        data: 'Your reset URL to reset your password was sent to your email address',
      },
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Please try again later.',
        500
      )
    );
  }
});

module.exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError('Password reset token is invalid or has expired', 400)
    );
  }
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token
  // });
});

module.exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  const isCorrectPassword = await user.comparePassword(
    passwordCurrent,
    user.password
  );
  if (!isCorrectPassword) {
    return next(
      new AppError(
        'Incorrect current user password. Please try another password.',
        401
      )
    );
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});
