const express = require("express");
const productController = require("../Controller/ProductController");
const userController = require("../Controller/UserController");

const router = express.Router();

router.route("/search/:keyword").get(productController.searchProduct);
router.route("/user-data/:email").get(userController.getUserDAta);

module.exports = router;
