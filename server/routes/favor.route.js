const express = require('express');
const favorController = require('../controllers/favor.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    favorController.getUserFavors
  )
  .post(
    authController.protect,
    authController.restrictTo('user'),
    favorController.setBookAndUser,
    favorController.createFavor
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    favorController.deleteFavor
  );

module.exports = router;
