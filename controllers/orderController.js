const { Menu } = require("../models/menuModel");
const { Order } = require("../models/orderModel");

// create order
const createOrder = async (req, res) => {
  try {
    const { items, restaurant } = req.body;
    let totalPrice = 0;
    // Check if items and restaurant are provided
    if (!items || !restaurant) {
      return res
        .status(400)
        .json({ message: "Items and restaurant are required." });
    }
    // Calculate the total price of the order
    for (let item of items) {
      const menuItem = await Menu.findById(item.menuItem);
      if (!menuItem) {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${item.menuItem}` });
      }
      totalPrice += menuItem.price * item.quantity;
    }
    // Create a new order
    const order = new Order({
      user: req.user.userId,
      restaurant,
      items,
      totalPrice,
    });
    // Save the order to the database
    await order.save();
    // Respond with the created order
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the order",
      error: error.message,
    });
  }
};
// get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get order by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update order status
const updateOrderStatus = async (req, res) => {
    try {
      console.log('Updating order status...');
      console.log('Order ID:', req.params.id);
      console.log('New Status:', req.body.status);
  
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      console.log('Order updated:', updatedOrder);
      res.status(200).json(updatedOrder);
  
    } catch (error) {
      console.error('Error updating order:', error.message);
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};