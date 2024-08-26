const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : [];
    const token = authorization.length > 1 ? authorization[1] : null;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      const payload = jwt.verify(token, jwtSecret);

      req.user = {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: "Invalid token" });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: "Token expired" });
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = isAuth;
