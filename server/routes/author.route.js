const express = require('express');
const authorController = require('./../controllers/author.controller');
const authController = require('./../controllers/auth.controller');

const router = express.Router();

router
  .route('/')
  .get(authorController.getAllAuthors)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    authorController.createAuthor
  );

router
  .route('/:id')
  .get(authorController.getAuthor)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    authorController.updateAuthor
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    authorController.deleteAuthor
  );

module.exports = router;
