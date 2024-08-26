const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true } // URL for the image
    }],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
