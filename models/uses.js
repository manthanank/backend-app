const mongoose = require('mongoose');

const usesSchema = new mongoose.Schema({
  laptop: { type: String },
  desktop: { type: String },
  keyboard: { type: String },
  mouse: { type: String },
  mobile: { type: String },
  tablet: { type: String },
  smartwatch: { type: String },
  watch: { type: String },
  earbuds: { type: String },
  headphones: { type: [String] },
  neckband: { type: String },
  smartbulb: { type: String },
  framework: { type: String },
  editor: { type: String },
  os: { type: String },
  browser: { type: [String] },
  searchengine: { type: String },
  mail: { type: String },
  cloud: { type: String },
  notes: { type: [String] },
  database: { type: [String] },
  hosting: { type: [String] },
  frontend: { type: [String] },
  backend: { type: [String] },
  api: { type: [String] },
  vcs: { type: String },
  ci: { type: String },
  design: { type: String },
  video: { type: String },
  audio: { type: String },
  social: { type: [String] },
  ecommerce: { type: [String] },
  food: { type: [String] },
  travel: { type: [String] },
  bank: { type: [String] },
});

const Uses = mongoose.model('Uses', usesSchema);

module.exports = Uses;