const Cart = require('../models/cart'); // Import your Cart model

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.userId; // Get user ID from session

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Find or create cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Update cart with the new item
        const existingItem = cart.items.find(item => item.productId.equals(productId));
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.session.userId; // Get user ID from session

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

