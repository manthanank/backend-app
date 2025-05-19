const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title must be less than 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      maxlength: [100, 'Author must be less than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
      min: [1000, 'Year must be at least 1000'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    genre: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Add indexes for faster queries
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ publishedYear: 1 });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
