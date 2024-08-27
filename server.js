const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const app = express();
const methodOverride = require('method-override');
const port = process.env.PORT || 5000;
const router = require('./routes/routes')
const dotenv = require('dotenv')
const adminRouter = require('./routes/adminRoutes')
const isAuth = require('./middleware/isAuth')


const connectMongodb = require('./config/db')
dotenv.config()

connectMongodb();

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
// Set the directory where your EJS templates will be stored
app.set('views', './views');
app.use(cookieParser());
// Middleware to serve static files like CSS, images, etc.
app.use('/static', express.static(path.join(__dirname, 'static')));
// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/cart.html',isAuth, (req, res)=>{
    res.render('cart')
})
app.get('/index.html', (req, res) => {
    res.render('index');
});
app.get('/shop.html', (req, res)=>{
    res.render('shop')
})
app.get('/about.html', (req, res)=>{
    res.render('about')
})
app.get('/contact.html', (req, res) => {
    res.render('contact');
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router)






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


