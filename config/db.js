const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongodb = async ()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_URL, {

        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

module.exports = connectMongodb;
