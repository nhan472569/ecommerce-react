const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const Book = require('./../models/book.model');
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

exports.uploadImages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 3,
  },
]);

exports.updateCloudImages = catchAsync(async (req, res, next) => {
  console.log(req.files.imageCover, req.files.images);
  if (!req.files.imageCover && !req.files.images) return next();

  const book = await Book.findById(req.params.id);
  if (req.files.imageCover) {
    try {
      await cloud.deleteImage(book.imageCover);
    } catch (err) {
      console.log(err.message);
    }
    req.body.imageCover = `book-${req.params.id}-${Date.now()}-cover`;
    await cloud.upload(req.files.imageCover[0].buffer, req.body.imageCover);
    // await sharp(req.files.imageCover[0].buffer)
    //   .resize(800, 1200)
    //   .toFormat('jpeg')
    //   .jpeg({ quality: 90 })
    //   .toFile(`public/img/books/${req.body.imageCover}`);
  }
  if (req.files.images) {
    req.body.images = book.images;
    await Promise.all(
      req.files.images.map(async (file, i) => {
        await cloud.deleteImage(book.imageCover);
        const order = file.originalname.at(-1);
        const fileName = `book-${req.params.id}-${Date.now()}-${order}`;
        await cloud.upload(file.buffer, fileName);

        // await sharp(file.buffer)
        //   .resize(1200, 1400)
        //   .toFormat('jpeg')
        //   .jpeg({ quality: 90 })
        //   .toFile(`public/img/books/${fileName}`);
        req.body.images[order - 1] = fileName;
      })
    );
  }
  next();
});

exports.getAllBooks = factory.getAll(Book);
exports.getTotals = factory.getTotals(Book);
exports.getBook = factory.getOne(Book);
exports.createBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book, true);
exports.getBookBySlug = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const book = await Book.findOne({ slug });
  if (!book) return next(new AppError('No document found with that name', 404));

  res.status(200).json({
    status: 'success',
    data: {
      data: book,
    },
  });
});
