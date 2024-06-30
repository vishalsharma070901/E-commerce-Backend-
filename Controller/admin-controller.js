const User = require("../Models/UserModel");
const Product = require("../Models/ProductModel");
const Order = require("../Models/OrderModel");
const asyncHandler = require("express-async-handler");
const { json } = require("express");

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No user Found" });
    }
    res.status(201).json({
      userCount: User.length,
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title, price, image, category, desc } = req.body;

    const productCreated = await Product.create({
      title,
      price,
      image,
      category,
      desc,
    });
    res.status(201).json({
      extraDetails: "Product added Sucessfull",

      productCreated,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    if (!Product || Product.length === 0) {
      return res.status(404).json({ message: "No Product Found" });
    }
    res.status(201).json({
      productCount: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const Update = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(201).json(Update);
  } catch (error) {
    console.log(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await Product.deleteOne({ _id: id });
    res
      .status(201)
      .json({ message: "Product has been deleted", deleteProduct });
  } catch (error) {
    console.log(error);
  }
});

const selectStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const changeStatus = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(201).json(changeStatus);
  } catch (error) {
    console.log(error);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const deleteOrder = await Order.deleteOne({ _id: id });
    res.status(201).json({ message: "Product has been deleted", deleteOrder });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getAllUsers,
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  selectStatus,
  deleteOrder,
};
