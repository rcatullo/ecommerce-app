const knex = require('../config/db');
const jwt    = require('jsonwebtoken');

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        const sellerProfile = await knex('seller_profiles')
            .where({ user_id: req.user.id })
            .first();
        
        if (!sellerProfile) {
            return res.status(403).json({ error: 'Only sellers can create products' });
        }

        const [product] = await knex('products')
            .insert({ 
                name, 
                description, 
                price, 
                seller_id: sellerProfile.id 
            })
            .returning(['id', 'name', 'description', 'price', 'seller_id']);
        res.status(201).json(product);
    } catch(err) { next(err); }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const sellerProfile = await knex('seller_profiles')
            .where({ user_id: req.user.id })
            .first();

        if (!sellerProfile) {
            return res.status(403).json({ error: 'Only sellers can update products' });
        }

        const [product] = await knex('products')
            .where({ id, seller_id: sellerProfile.id })
            .update({ name, description, price })
            .returning(['id', 'name', 'description', 'price', 'seller_id']);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found or unauthorized' });
        }
        res.json(product);
    } catch(err) { next(err); }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sellerProfile = await knex('seller_profiles')
            .where({ user_id: req.user.id })
            .first();

        if (!sellerProfile) {
            return res.status(403).json({ error: 'Only sellers can delete products' });
        }

        const deleted = await knex('products')
            .where({ id, seller_id: sellerProfile.id })
            .del();
        
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found or unauthorized' });
        }
        res.status(204).send();
    } catch(err) { next(err); }
}

exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await knex('products')
            .where({ id })
            .first();
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch(err) { next(err); }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await knex('products').select('*');
        res.json(products);
    } catch(err) { next(err); }
}