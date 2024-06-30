const Order = require("../Models/OrderModel");
const asyncHandler = require("express-async-handler");

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(201).json({
      orderCount: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
  }
});

const getUserOrder = asyncHandler(async (req, res) => {
  try {
    const { buyer } = req.params;
    const orders = await Order.find({ buyer });

    res.status(201).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in getting user orders");
  }
});
module.exports = { getAllOrders, getUserOrder };
