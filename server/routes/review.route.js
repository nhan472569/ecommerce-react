const express = require('express');
const reviewController = require('./../controllers/review.controller');
const authController = require('./../controllers/auth.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setBookAndUser,
    reviewController.createReview
  );

router.route('/book-review-stats').get(reviewController.getReviewStats);
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewController.validateUser,
    reviewController.deleteReview
  );

module.exports = router;
