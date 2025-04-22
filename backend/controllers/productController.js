const knex = require('../config/db');
const jwt    = require('jsonwebtoken');

exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await knex('products')
            .where({ id })
            .first();
        if (!product) res.status(404).send();
        res.json(product);
    } catch(err) { next(err); }
}

exports.getSellerByProductId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await knex.transaction(async trx => {
            const product = await trx('products')
                .where({ id })
                .first();
            if (!product) return null;
            const user = await trx('users').where({ id: product.user_id }).first();
            if (!user) return null;

            return user;
        });
        result ? res.json(result) : res.status(404).send();
    } catch(err) { next(err); }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await knex('products').select('*');
        res.json(products);
    } catch(err) { next(err); }
}