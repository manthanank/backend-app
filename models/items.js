const mongoose = require('mongoose');

/**
 * Item Schema
 * @description Schema for the Items collection
 */
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will automatically handle createdAt and updatedAt
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Virtual property for formatted price
itemSchema.virtual('formattedPrice').get(function () {
  return `$${this.price.toFixed(2)}`;
});

// Index for faster queries
itemSchema.index({ name: 1 });
itemSchema.index({ category: 1 });
itemSchema.index({ price: 1 });
itemSchema.index({ createdAt: -1 });
itemSchema.index({ isAvailable: 1 }); // Filter available items quickly
itemSchema.index({ category: 1, price: 1 }); // Compound index for category + price queries
itemSchema.index({ tags: 1 }); // Index for tag searches
itemSchema.index({ name: 'text', description: 'text' }); // Full-text search on name and description

// Static method to find items by price range
itemSchema.statics.findByPriceRange = function (min, max) {
  return this.find({
    price: { $gte: min, $lte: max },
  });
};

// Instance method to check if item is in stock
itemSchema.methods.isInStock = function () {
  return this.quantity > 0;
};

// No manual hooks needed as timestamps: true handles createdAt and updatedAt automaticaly

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
