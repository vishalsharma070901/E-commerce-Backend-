const express = require("express");
const orderController = require("../Controller/OrderController");
const router = express.Router();

router.route("/get-all-orders").get(orderController.getAllOrders);
router.route("/get-user-orders/:buyer").get(orderController.getUserOrder);

module.exports = router;
