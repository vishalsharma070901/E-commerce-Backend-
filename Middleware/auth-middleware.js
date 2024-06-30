const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

// const dontenv = require("dotenv")
// dontenv.config()

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token)
  if (!token) {
    // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // console.log("token from auth middle ware ",token)
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRECT_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    // console.log(userData)
    // res.status(201).json(userData)
    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
