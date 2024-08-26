const User = require('../models/user');
const jwt = require('jsonwebtoken');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword')
require('dotenv').config();

// Sign Up
const signUp = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }
        // Create and save the user
        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword, phone, address, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Sign In
const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email or password is missing' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // Check password against hashed one in the database
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // Generate JWT token
        const token = generateToken(user);

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, // Ensures the cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000, // 1 hour
        });

        // Respond with a success message and user info
        res.status(200).json({ message: "Login successful!",token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Change Password
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { _id } = req.user;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (newPassword === user.password) {
            return res.status(400).json({ error: "This is the same as the old password" });
        }
        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Your old password is incorrect" });
        }
        const hashed = await hashPassword(newPassword);
        user.password = hashed;
        await user.save();
        res.status(200).json("Password Changed Successfully");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signUp,
    signIn,
    changePassword
};
