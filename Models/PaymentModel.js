const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    require: true,
  },
  razorpay_Payment_id: {
    type: String,
    require: true,
  },
  razorpay_signature: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Payment = new mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
