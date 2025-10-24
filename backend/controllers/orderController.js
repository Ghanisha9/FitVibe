// controllers/orderController.js
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// POST /order
exports.placeOrder = async (req, res) => {
  const { shippingAddress, paymentInfo } = req.body;

  if (!shippingAddress) {
    return res.status(400).json({ error: 'Shipping address is required' });
  }

  // Start a Mongoose session for a transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Get user and populate cart items within the transaction
    const user = await User.findById(req.user.id).session(session).populate('cart.productId');

    if (!user || user.cart.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2. Calculate total price and create order items array
    let totalPrice = 0;
    const orderItems = user.cart.map((item) => {
      if (!item.productId) {
        throw new Error('Cart item product not found.');
      }
      totalPrice += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        name: item.productId.name, // Denormalize
        quantity: item.quantity,
        priceAtPurchase: item.productId.price, // Denormalize
      };
    });

    // 3. Create the order
    const order = new Order({
      user: user._id,
      items: orderItems,
      totalPrice,
      shippingAddress,
      status: 'Pending',
    });
    
    const createdOrder = await order.save({ session });

    // 4. Clear the user's cart
    user.cart = [];
    await user.save({ session });

    // 5. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: createdOrder._id,
        totalPrice: createdOrder.totalPrice,
        status: createdOrder.status,
        date: createdOrder.date,
      },
    });

  } catch (err) {
    // If anything fails, roll back the transaction
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ error: 'Server error during order placement' });
  }
};

// GET /orders
exports.getMyOrders = async (req, res) => {
  try {
    // Find orders and populate the product details for each item
    const orders = await Order.find({ user: req.user.id })
      .populate('items.productId', 'name imageURL') // Only get name/image from Product
      .sort({ date: -1 }); // Sort by newest first

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};