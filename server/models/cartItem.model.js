const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
  },
  userId: {
    type: String,
  },
});
cartItemSchema.index({ book: 1, userId: 1 }, { unique: true });

cartItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'book',
    select: 'name imageCover price slug',
  });
  next();
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
