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

    // If no token is provided, redirect to sign-in
    if (!token) {
      return res.redirect('api/auth/signin'); // Ensure no further code execution
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
      // Handle JWT errors and redirect to sign-in
      return res.redirect('api/auth/signin'); // Ensure no further code execution
    }
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ error: "Internal Server Error" }); // Ensure no further code execution
  }
};

module.exports = isAuth;
