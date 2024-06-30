const express = require("express");
const {
  getAllUsers,
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../Controller/admin-controller");
const adminController = require("../Controller/admin-controller");
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-middleware");
const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/create-product")
  .post(authMiddleware, adminMiddleware, adminController.createProduct);
router.route("/products").get(authMiddleware, adminMiddleware, getAllProducts);
router.route("/product/:id").get(authMiddleware, adminMiddleware, getProduct);
router
  .route("/updateproduct/:id")
  .put(authMiddleware, adminMiddleware, updateProduct);
router
  .route("/deleteProduct/:id")
  .delete(authMiddleware, adminMiddleware, deleteProduct);
router.route("/order-status/:id").put(adminController.selectStatus);
router.route("/deleteOrder/:id").delete(adminController.deleteOrder);

module.exports = router;
