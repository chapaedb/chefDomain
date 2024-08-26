const { check } = require('express-validator');

const signupValidator = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password should be at least 6 chars long").notEmpty().withMessage("Password is required"),
];

const signinValidator = [
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("password").notEmpty().withMessage('Password is required')
];

const emailValidator = [
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required")
];
const passwordValidator = [
    check('oldPassword').notEmpty().withMessage("Enter your old password"),
    check('newPassword').notEmpty().withMessage('Enter the new password')
]
module.exports = {
    signupValidator,
    signinValidator,
    emailValidator,
    passwordValidator
};
