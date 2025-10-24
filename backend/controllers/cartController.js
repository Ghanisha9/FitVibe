// controllers/cartController.js
const User = require('../models/userModel');
const Product = require('../models/productModel');

// GET /cart
exports.getCart = async (req, res) => {
  try {
    // Find the user and populate the 'productId' field in their cart
    // This replaces the SQL JOIN
    const user = await User.findById(req.user.id).populate('cart.productId');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await User.findById(req.user.id);

    // Check if item already in cart
    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({ productId, quantity });
    }

    await user.save();
    
    // Populate the newly added/updated item for a better response
    const updatedUser = await User.findById(req.user.id).populate('cart.productId');
    const updatedItem = updatedUser.cart.find(item => item.productId._id.toString() === productId);

    res.status(201).json({ 
      message: 'Item added/updated in cart', 
      item: updatedItem 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /cart/:productId
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);

    const initialLength = user.cart.length;
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    if (user.cart.length === initialLength) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    await user.save();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};