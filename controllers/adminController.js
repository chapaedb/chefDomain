const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

showEditProductForm = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Pass `product` and `productId` to the template
        res.render('admin/editProduct', { product, productId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


getDashboard = (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
};

getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.render('admin/products', { title: 'Manage Products', products });
};

createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/admin/products');
};

updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, description, price },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }

        res.redirect('/admin/products'); // Redirect to the product management page
    } catch (error) {
        res.status(500).send(error.message);
    }
};


deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
};

getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.render('admin/orders', { title: 'Manage Orders', orders });
};

updateOrderStatus = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.redirect('/admin/orders');
};

// Optional: User management
getAllUsers = async (req, res) => {
    const users = await User.find();
    res.render('admin/users', { title: 'Manage Users', users });
};

deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/users');
};
module.exports = {
    getDashboard,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    deleteUser,
    showEditProductForm
};