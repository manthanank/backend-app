const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for email lookups
subscriberSchema.index({ email: 1 }, { unique: true });

const Subscribers = mongoose.model('subscribers', subscriberSchema);

module.exports = Subscribers;
