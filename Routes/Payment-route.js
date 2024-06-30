const express = require("express");
const PaymentController = require("../Controller/Payemnt-controller");
const router = express.Router();

router.route("/order").post(PaymentController.PaymentOrder);
router.route("/verify").post(PaymentController.PaymentVerify);

module.exports = router;
