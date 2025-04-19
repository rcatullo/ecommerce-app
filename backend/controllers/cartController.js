const knex = require('../config/db');

exports.getCart = async (req, res, next) => {
    try {
        const items = await knex('cart_items')
            .where({ user_id: req.user.id })
            .join('products', 'cart_items.product_id', 'products.id')
            .select('cart_items.*', 'products.name', 'products.price');
        res.json(items);
    } catch (err) {
        next(err);
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const existing = await knex('cart_items')
            .where({ user_id: req.user.id, product_id: productId })
            .first();
        if (existing) {
            await knex('cart_items')
                .where({ id: existing.id })
                .update({ quantity: existing.quantity + quantity });
        } else {
            await knex('cart_items').insert({
                user_id: req.user.id,
                product_id: productId,
                quantity,
            });
        }
        res.status(201).json({ success: true });
    } catch (err) {
        next(err);
    }
};

exports.updateCartItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const item = await knex('cart_items')
            .where({ user_id: req.user.id, id })
            .update({ quantity });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await knex('cart_items')
            .where({ user_id: req.user.id, id })
            .del();
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};