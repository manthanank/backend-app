const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String
});

module.exports = mongoose.model('Item', itemSchema);