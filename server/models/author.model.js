const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide author name.'],
    unique: true,
    trim: true,
  },
  photo: {
    type: String,
    required: [true, 'Please provide author photo.'],
  },
  quote: String,
  summary: {
    type: String,
    required: [true, 'Please tell author summary.'],
  },
  placeOfBirth: {
    type: String,
    required: [true, 'Please provide place of birth.'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide date of birth.'],
  },
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
