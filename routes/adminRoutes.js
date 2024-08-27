const express = require('express');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Admin dashboard route
router.get('/dashboard', isAuth, isAdmin, adminController.getDashboard);

// Manage Products
router.get('/products', isAuth, isAdmin, adminController.getAllProducts);

router.post('/products', isAuth, isAdmin, adminController.createProduct);

router.get('/products/:id/edit', isAuth, isAdmin, adminController.showEditProductForm);

router.post('/products/:id/edit', isAuth, isAdmin, adminController.updateProduct);
router.post('/products/:id/delete', isAuth, isAdmin, adminController.deleteProduct);

// Manage Orders
router.get('/orders', isAuth, isAdmin, adminController.getAllOrders);
router.put('/orders/:id/status', isAuth, isAdmin, adminController.updateOrderStatus);

// Manage Users (optional)
router.get('/users', isAuth, isAdmin, adminController.getAllUsers);

router.post('/users/:id/delete', isAuth, isAdmin, adminController.deleteUser);
router.post('/users/:id/edit', isAuth, isAdmin, adminController.deleteUser);


module.exports = router;
