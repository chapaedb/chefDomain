const jwt = require("jsonwebtoken");
require('dotenv').config()
const  jwtSecret  = process.env.JWT_SECRET;

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    {
   
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = generateToken;