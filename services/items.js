const Item = require('../models/items');

/**
 * Service layer for items
 */
class ItemService {
  /**
   * Create a new item
   * @param {Object} itemData - The item data
   * @returns {Promise<Object>} - The created item
   */
  async createItem(itemData) {
    const item = new Item(itemData);
    return await item.save();
  }
  /**
   * Get all items with pagination
   * @param {Object} options - The options object
   * @param {number} options.page - The page number (1-based)
   * @param {number} options.limit - The number of items per page
   * @param {Object} options.sort - The sort criteria
   * @param {Object} options.filter - The filter criteria
   * @returns {Promise<{items: Array, total: number, page: number, limit: number, pages: number}>}
   */
  async getItems(options = {}) {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = options.sort || { createdAt: -1 };
    
    // Build the filter object
    let filter = {};
    
    // Add category filter if provided
    if (options.filter && options.filter.category) {
      filter.category = { $regex: new RegExp(options.filter.category, 'i') };
    }
    
    // Add price range filter if provided
    if (options.filter && (options.filter.minPrice || options.filter.maxPrice)) {
      filter.price = {};
      if (options.filter.minPrice) {
        filter.price.$gte = parseFloat(options.filter.minPrice);
      }
      if (options.filter.maxPrice) {
        filter.price.$lte = parseFloat(options.filter.maxPrice);
      }
    }
    
    // Add availability filter if provided
    if (options.filter && options.filter.isAvailable !== undefined) {
      filter.isAvailable = options.filter.isAvailable === 'true';
    }
    
    // Add search query for name and description
    if (options.filter && options.filter.search) {
      const searchRegex = new RegExp(options.filter.search, 'i');
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex }
      ];
    }
    
    // Add tags filter if provided
    if (options.filter && options.filter.tags) {
      const tags = Array.isArray(options.filter.tags) 
        ? options.filter.tags 
        : [options.filter.tags];
      filter.tags = { $in: tags };
    }

    const [items, total] = await Promise.all([
      Item.find(filter).sort(sort).skip(skip).limit(limit),
      Item.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    };
  }

  /**
   * Get a single item by ID
   * @param {string} itemId - The item ID
   * @returns {Promise<Object>} - The found item
   * @throws {Error} - If item not found
   */
  async getItemById(itemId) {
    const item = await Item.findById(itemId);
    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      throw error;
    }
    return item;
  }

  /**
   * Update an item
   * @param {string} itemId - The item ID
   * @param {Object} updateData - The data to update
   * @returns {Promise<Object>} - The updated item
   * @throws {Error} - If item not found
   */
  async updateItem(itemId, updateData) {
    // First verify the item exists
    await this.getItemById(itemId);
    
    // Update the item
    const updatedItem = await Item.findByIdAndUpdate(
      itemId, 
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    return updatedItem;
  }

  /**
   * Delete an item
   * @param {string} itemId - The item ID
   * @returns {Promise<Object>} - The deletion result
   * @throws {Error} - If item not found
   */
  async deleteItem(itemId) {
    // First verify the item exists
    await this.getItemById(itemId);
    
    // Delete the item
    await Item.findByIdAndDelete(itemId);
    return { message: 'Item deleted successfully' };
  }

  /**
   * Get item statistics
   * @returns {Promise<Object>} - The item statistics
   */
  async getItemStats() {
    // Use MongoDB aggregation to get statistics
    const stats = await Item.aggregate([
      {
        $facet: {
          // Count total items
          totalItems: [
            { $count: 'count' }
          ],
          // Calculate average price
          avgPrice: [
            { $group: { _id: null, avg: { $avg: '$price' } } }
          ],
          // Get price range (min, max)
          priceRange: [
            { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } }
          ],
          // Count by category
          categoryCount: [
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          // Count items with zero quantity (out of stock)
          outOfStock: [
            { $match: { quantity: 0 } },
            { $count: 'count' }
          ],
          // Count by availability
          availabilityCount: [
            { $group: { _id: '$isAvailable', count: { $sum: 1 } } }
          ],
          // Most recent items
          recentItems: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            { $project: { name: 1, price: 1, createdAt: 1 } }
          ]
        }
      },
      {
        // Transform the results into a more friendly format
        $project: {
          totalItems: { $arrayElemAt: ['$totalItems.count', 0] },
          avgPrice: { $round: [{ $arrayElemAt: ['$avgPrice.avg', 0] }, 2] },
          minPrice: { $arrayElemAt: ['$priceRange.min', 0] },
          maxPrice: { $arrayElemAt: ['$priceRange.max', 0] },
          categoryDistribution: '$categoryCount',
          outOfStockCount: { $arrayElemAt: ['$outOfStock.count', 0] },
          availabilityDistribution: '$availabilityCount',
          recentItems: '$recentItems'
        }
      }
    ]);

    return stats[0];
  }

  /**
   * Add tags to an item
   * @param {string} itemId - The item ID
   * @param {Array} tags - The tags to add
   * @returns {Promise<Object>} - The updated item
   * @throws {Error} - If item not found
   */
  async addItemTags(itemId, tags) {
    if (!Array.isArray(tags) || tags.length === 0) {
      throw new Error('Tags must be a non-empty array');
    }
    
    // First verify the item exists
    await this.getItemById(itemId);
    
    // Add tags (using $addToSet to avoid duplicates)
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { 
        $addToSet: { tags: { $each: tags } },
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    return updatedItem;
  }
  
  /**
   * Remove tags from an item
   * @param {string} itemId - The item ID
   * @param {Array} tags - The tags to remove
   * @returns {Promise<Object>} - The updated item
   * @throws {Error} - If item not found
   */
  async removeItemTags(itemId, tags) {
    if (!Array.isArray(tags) || tags.length === 0) {
      throw new Error('Tags must be a non-empty array');
    }
    
    // First verify the item exists
    await this.getItemById(itemId);
    
    // Remove tags
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { 
        $pullAll: { tags: tags },
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    return updatedItem;
  }
}

module.exports = new ItemService();
