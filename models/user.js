const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: Number,  },
    address: { type: String,  },
    role: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
