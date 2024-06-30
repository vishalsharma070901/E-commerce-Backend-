const express = require("express");
const authControllers = require("../Controller/auth-controller");
const validate = require("../Middleware/validate-middleware");
const { signupScheme, loginSchema } = require("../Validators/auth-validator");
const authMiddleware = require("../Middleware/auth-middleware");
const router = express.Router();

router
  .route("/register")
  .post(validate(signupScheme), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);
module.exports = router;
