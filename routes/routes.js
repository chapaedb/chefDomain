const express = require('express');
const productController = require('../controllers/productsController')
const { signUp, signIn, changePassword } = require('../controllers/authController');
const cart = require('../controllers/cartController');
const fileUpload = require('../middleware/fileUpload')
const {signinValidator, signupValidator, passwordValidator} = require('../validator/auth')
const validate = require('../validator/validate')
const isAuth = require('../middleware/isAuth')
const isAdmin = require('../middleware/isAdmin')
const adminRoutes = require('./adminRoutes');
const router = express.Router();


router.use('/admin', adminRoutes);
//PRODUCT ROUTES
router.get('/products/:id', productController.getProduct);//  To get a single product by its Id
router.get('/products', productController.getProducts);// This is to get all the products
router.post('/products',isAuth,isAdmin, productController.createProduct);//Protected route(Needs authorization)
router.put('/products/:id',isAuth,isAdmin, productController.updateProduct)//Protected
router.delete('/products/:id',isAuth,isAdmin, productController.deleteProduct)// Protected
router.post('/products/:id/upload',isAuth,isAdmin, fileUpload, productController.upload )// Protected

//AUTH ROUTES
router.get('/auth/signin', (req, res) => {
    res.render('signin');
});
router.get('/auth/signup', (req, res) => {
    res.render('signup');
});

router.post('/auth/signup',signupValidator, validate, signUp); 
router.post('/auth/signin',signinValidator, validate, signIn); 

//CART ROUTES
router.post('/cart/add', cart.addToCart);
router.get('/cart', cart.getCart);





module.exports = router;
