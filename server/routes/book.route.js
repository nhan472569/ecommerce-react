const express = require('express');
const reviewRouter = require('./review.route');
const favorRouter = require('./favor.route');
const bookController = require('./../controllers/book.controller');
const authController = require('./../controllers/auth.controller');

const router = express.Router();

router.use('/:bookId/reviews', reviewRouter);
router.use('/:bookId/favors', favorRouter);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    bookController.uploadImages,
    bookController.updateCloudImages,
    bookController.createBook
  );

router.route('/count').get(bookController.getTotals);
router
  .route('/:id')
  .get(bookController.getBook)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    bookController.uploadImages,
    bookController.updateCloudImages,
    bookController.updateBook
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    bookController.deleteBook
  );

module.exports = router;
