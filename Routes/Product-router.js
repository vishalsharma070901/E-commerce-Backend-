const express = require("express");
const productController = require("../Controller/ProductController");

const router = express.Router();

router.route("/search/:keyword").get(productController.searchProduct);
router.route("braintree/token").get(productController.brainTreeTokenController);
router.route("/get-products").get(productController.getAllProducts);
router.route("/get-product/:id").get(productController.getProduct);

module.exports = router;
