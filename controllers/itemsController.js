const Item = require('../models/items.js');

// Create item
exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    const updatedItem = await Item.findByIdAndUpdate(item._id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    await Item.findByIdAndDelete(item._id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
