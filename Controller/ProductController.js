const Product = require("../Models/ProductModel");
const asyncHandler = require("express-async-handler");
const braintree = require("braintree");
const Order = require("../Models/OrderModel");
const dotenv = require("dotenv");

dotenv.config();

const searchProduct = asyncHandler((req, res) => {
  try {
    const { keyword } = req.params;
    const result = Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    }).select("-image");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Search filter error");
  }
});
const brainTreeTokenController = asyncHandler((req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const braintreePayementController = asyncHandler((req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.name((i) => {
      total += i.price;
    });

    let newTranSaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (err) {
          const order = new Order({
            product: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.status(200).json({ ok: true });
        } else {
          res.status(500).json(err);
        }
      }
    );
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
module.exports = {
  searchProduct,
  brainTreeTokenController,
  braintreePayementController,
  getAllProducts,
  getProduct,
};
