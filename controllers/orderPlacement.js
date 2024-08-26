const User = require('../models/user');
const Order = require('../models/order');

//Function to create an order instance
async function createOrder(userId, shippingAddressId) {
    const order = new Order ({
        user: userId,
        orderItems: [],
        shippingAddress: shippingAddressId
    });
    return order;
}

//Function to add items to the order
async function addOrderItems(order, productId, quantity, price) {
    const orderItem = {
        product: productId,
        qty: quantity,
        price: price
    };

    order.orderItems.push(orderItem);
}

//Function to calculate the Total cost 
function totalCost(order) {
    let totalCost = 0;
order.orderItems.forEach(item => {
    totalCost += item.qty * item.price;
});


    return totalCost;
}

//Function to save the order in the database
