const adminMiddleware = (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;

    if (!adminRole) {
      return res
        .status(403)
        .send({ message: "Access denied. User is not an Admin" });
      // console.log("Access denied. User is not an Admin")
    }

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = adminMiddleware;
