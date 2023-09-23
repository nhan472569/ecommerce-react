// const { default: mongoose } = require('mongoose');
// const CartItem = require('../models/cartItem.model');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
// const factory = require('./handleFactory.controller');

// exports.getByUserId = catchAsync(async (req, res, next) => {
//   const userId = req.user.id;
//   const cartItems = await CartItem.find({ userId });
//   const totalAmount = cartItems.reduce(
//     (total, item) => total + item.book.price * item.quantity,
//     0
//   );

//   return res.status(200).json({
//     status: 'success',
//     data: {
//       data: cartItems,
//       totalAmount,
//     },
//   });
// });

// exports.createCartItem = catchAsync(async (req, res, next) => {
//   const { book, userId, quantity } = req.body;
//   const cartItem = await CartItem.findOne({ book, userId });

//   if (cartItem) {
//     if (quantity == null) {
//       cartItem.quantity += 1;
//     } else {
//       cartItem.quantity += quantity;
//     }

//     await cartItem.save({
//       validateBeforeSave: true,
//     });
//     return res.status(200).json({
//       status: 'success',
//       data: {
//         data: cartItem,
//       },
//     });
//   }
//   if (quantity === null) return next(new AppError('Invalid quantity', 400));

//   let newCartItem = await CartItem.findOneAndUpdate(
//     { _id: mongoose.Types.ObjectId() },
//     req.body,
//     {
//       new: true,
//       upsert: true,
//       runValidators: true,
//       setDefaultsOnInsert: true,
//       populate: {
//         path: 'book',
//         select: 'name imageCover price slug',
//       },
//     }
//   );

//   return res.status(201).json({
//     status: 'success',
//     data: {
//       data: newCartItem,
//     },
//   });
// });

// exports.updateCartItem = factory.updateOne(CartItem);
// exports.deleteCartItem = factory.deleteOne(CartItem);
