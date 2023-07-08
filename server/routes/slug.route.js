const express = require('express');
const bookController = require('./../controllers/book.controller');

const router = express.Router();

router.route('/books/:slug').get(bookController.getBookBySlug);

module.exports = router;
