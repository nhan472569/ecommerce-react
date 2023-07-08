const slugify = require('slugify');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A book must have a name.'],
      unique: true,
      trim: true,
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, 'Rating point must be below 5.0'],
      min: [1, 'Rating point must be below 1.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A book must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // ONLY RUN WHEN CREATE A NEW DOCUMENT
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      // required: [true, 'A book must have a summary'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A book must have a cover image'],
      default: 'book-default.jpeg',
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    category: [String],
    authors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Author',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

bookSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'book',
  localField: '_id',
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
