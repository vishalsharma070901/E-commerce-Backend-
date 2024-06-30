const Payment = require("../Models/PaymentModel");
const crypto = require("crypto");

const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const Order = require("../Models/OrderModel");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const PaymentOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(201).json({
      sucess: true,
      order,
    });
    console.log(order);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

const PaymentVerify = asyncHandler(async (req, res) => {
  try {
    // Create Sign
    const {
      razorpay_order_id,
      razorpay_Payment_id,
      razorpay_signature,
      cart,
      user,
      name,
      address,
      pincode,
      phone,
      totalPrice,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_Payment_id;

    // Create ExpectedSign
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    //  console.log(razorpay_signature === expectedSign);

    // Create isAuthentic
    const isAuthentic = expectedSign === razorpay_signature;

    // Condition
    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_Payment_id, // Change to snake_case to match the variable name
        razorpay_signature,
      });

      await payment.save();

      const order = new Order({
        products: cart,
        orderId: razorpay_order_id,
        buyer: user,
        name: name,
        address: address,
        pincode: pincode,
        totalPrice: totalPrice,
        phone: phone,
      });

      await order.save();

      console.log(cart);
      res.json({
        message: "Payement Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

module.exports = { PaymentOrder, PaymentVerify };
