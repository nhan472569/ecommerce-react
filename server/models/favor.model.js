const mongoose = require('mongoose');

const favorSchema = new mongoose.Schema(
  {
    createAt: {
      type: Date,
      default: Date.now,
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
      required: [true, 'Favor must belong to a book.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      select: false,
      required: [true, 'Favor must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
favorSchema.index({ book: 1, user: 1 }, { unique: true });

favorSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'book',
    select: 'name imageCover ratingsAverage ratingsQuantity price',
  });
  next();
});

const favor = mongoose.model('Favor', favorSchema);
module.exports = favor;
