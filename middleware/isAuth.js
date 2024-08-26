const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const isAuth = async (req, res, next) => {
  try {
    // Check if the token is in the Authorization header or in cookies
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : [];
    const token = authorization.length > 1 ? authorization[1] : req.cookies.token;

    // If no token is provided, return an error
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      // Verify the token
      const payload = jwt.verify(token, jwtSecret);

      // Attach user info to the request object
      req.user = {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      // Handle JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: "Invalid token" });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: "Token expired" });
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = isAuth;
