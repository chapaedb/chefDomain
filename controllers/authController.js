const User = require('../models/user');
const jwt = require('jsonwebtoken');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');

const hashPassword = require('../utils/hashPassword');
require('dotenv').config();
// Sign Up
const signUp = async (req, res, next) => {
   
    try {
        const {name,email, password , phone, address,role} = req.body;// The signup was not working cuz the required fields were not parsed or handled

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: "Email is already in use" });
        }

        // Create and save the user
        const hashedPassword = await hashPassword(password)
        const user = new User({name, email, password:hashedPassword, phone, address, role });
        await user.save();

        res.status(201).json({message: "User registered successfully!", user });
    } catch (error) {
        res.status(500).json({error: error.message });
    }
}


const signIn = async (req, res, next) => {
    
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email or password is missing' });
        }
        

        // This code Checks if user exists
        const user = await User.findOne({email });
        if (!user) {
            return res.status(400).json({error: "Invalid credentials" });
        }

        //For checking password against hashed one in db
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        
        //This code generates jwt token
        const token = generateToken(user);

        res.status(200).json({message: "Login successful!", token });
    }
    catch (error) {
        res.status(500).json({error: error.message });
    }
}

const changePassword = async (req, res, next)=>{
    try{
        const {oldPassword, newPassword} = req.body;
    const {_id} = req.user;

    const user = await User.findById(_id);
    if(!user){
        return res.status(404).json({error: "User not found"})
    }
    if(newPassword === user.password){
        return res.status(400).json("This is the same as the old password")
    }
   const isMatch = await comparePassword(oldPassword, user.password);
   if(!isMatch){
    return res.status(400).json("Your old password is incorrect");
   }
   const hashed = await hashPassword(newPassword);
   user.password = hashed;
   await user.save();
   res.status(200).json("Password Changed Successfully");
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    signUp,
    signIn,
    changePassword
};
