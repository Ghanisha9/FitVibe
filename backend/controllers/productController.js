// controllers/productController.js
const Product = require('../models/productModel');

// GET /products
exports.getProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sort } = req.query;
    
    // Build query object
    const filter = {};
    
    if (q) {
      filter.name = { $regex: q, $options: 'i' }; // Case-insensitive search
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    // Price filtering
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = parseFloat(maxPrice);
      }
    }

    // Build sort object
    let sortOptions = {};
    if (sort === 'price_asc') {
      sortOptions.price = 1; // 1 for ascending
    } else if (sort === 'price_desc') {
      sortOptions.price = -1; // -1 for descending
    } else {
      sortOptions.createdAt = -1; // Default sort by newest
    }

    const products = await Product.find(filter).sort(sortOptions);
    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};