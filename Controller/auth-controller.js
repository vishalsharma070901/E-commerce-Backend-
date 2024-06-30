const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ extraDetails: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(201).json({
      extraDetails: "Registration Sucessfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    next(error);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(400).json({ extraDetails: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, emailExist.password);
    if (isPasswordValid) {
      res.status(201).json({
        extraDetails: "Login Sucessfull",
        token: await emailExist.generateToken(),
        userId: emailExist._id.toString(),
      });
    } else {
      res.status(400).json({ extraDetails: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    // console.log(userData);
    res.status(200).json(userData);
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { register, login, user };
