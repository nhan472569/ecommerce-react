const Author = require('./../models/author.model');
const factory = require('./handleFactory.controller');

exports.getAllAuthors = factory.getAll(Author);
exports.getAuthor = factory.getOne(Author);
exports.createAuthor = factory.createOne(Author);
exports.updateAuthor = factory.updateOne(Author);
exports.deleteAuthor = factory.deleteOne(Author);
