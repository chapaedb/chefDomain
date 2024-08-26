const { default: mongoose } = require('mongoose');
const Product = require('../models/product');


const createProduct = async (req, res, next)=>{
    try{
         const product = new Product(req.body);

         await product.save();
        res.status(200).json({message: "Product Added successfully", product})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getProduct = async (req, res, next)=>{
    try{
        const productId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({error:"Invalid product Id format"})
        }
        const product = await Product.findById(productId);
        
        if(!product){
           return res.status(404).json("Product not found");
        }
        res.status(200).json(product);
        
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getProducts = async (req, res, next)=>{
    try{
        const products = await Product.find();
        res.status(200).json({products});
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
    
}

const updateProduct = async (req, res,next)=>{
try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if(!product){
        return res.status(404).json("Item not foud")
    }
    res.status(200).json(product)
} 
catch(error){
    res.status(400).json({error: error.message})
}
}

const deleteProduct = async (req, res, next)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            res.status(404).json("Item not found")
        }
        res.status(200).json("Product deleted successfully")
    }   
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const upload = async (req, res) => {
    try {
        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Map the uploaded files to their file paths
        const filePaths = req.files.map(file => `/uploads/${file.filename}`);

    
        product.image = filePaths;

        await product.save();

        res.status(200).json({ message: 'Images uploaded successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



 
module.exports = {
    createProduct, getProduct, getProducts, updateProduct, deleteProduct, upload
}

