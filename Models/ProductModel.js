const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  desc: {
    type: String,
    default: false,
  },
});

const Product = new mongoose.model("Product", ProductSchema);
module.exports = Product;
