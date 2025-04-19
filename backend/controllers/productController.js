const knex = require('../config/db');
const jwt    = require('jsonwebtoken');

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        const [product] = await knex('products')
            .insert({ name, description, price })
            .returning(['id', 'name', 'description', 'price']);
        res.status(201).json(product);
    } catch(err) { next(err); }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const [product] = await knex('products')
            .where({ id })
            .update({ name, description, price })
            .returning(['id', 'name', 'description', 'price']);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch(err) { next(err); }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await knex('products')
            .where({ id })
            .del();
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
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