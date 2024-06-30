const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");

const getUserDAta = asyncHandler(async (req, res) => {
  try {
    const { email } = req.params;
    const users = await User.findOne({ email });

    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in get single user data");
  }
});

module.exports = { getUserDAta };
