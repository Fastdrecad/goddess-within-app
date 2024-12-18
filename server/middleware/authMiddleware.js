const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/user");

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "ROLE ADMIN") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

module.exports = { protect, admin };
