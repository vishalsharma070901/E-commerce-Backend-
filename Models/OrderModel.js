const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    ],
    orderId: {
      type: String,
    },
    buyer: {
      type: String,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    pincode: {
      type: String,
    },
    totalPrice: {
      type: String,
    },
    phone: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
