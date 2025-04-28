const knex = require('../config/db');

exports.getSellerProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await knex('products')
            .join('users', 'products.user_id', 'users.id')
            .where('users.id', id)
            .select('products.*');
        
        res.json(products);
    } catch(err) { next(err); }
};

exports.getSellerByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await knex('users').where('username', username).first();
        
        res.json(user);
    } catch(err) { next(err); }
}

exports.createSellerProduct = async (req, res, next) => {
    try {
        const result = await knex.transaction(async trx => {
            const user = await trx('users').where('id', req.user.id).first();

            if (!user.is_seller) return res.status(401);

            await trx('products').insert({...req.body, user_id: req.user.id});
            
            return { success: true };
        });

        res.status(201).json(result);
    } catch(err) { next(err); }
};

exports.updateSellerProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const result = await knex.transaction(async trx => {
            const user = await trx('users').where('id', req.user.id).first();

            if (!user.is_seller) return res.status(401);

            await trx('products').which('id', productId).update(req.body);

            return { success: true };
        });

        res.json(result);
    } catch(err) { next(err); }
}

exports.deleteSellerProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const result = await knex.transaction(async trx => {
            const user = await trx('users').where('id', req.user.id).first();

            if (!user.is_seller) return res.status(401);

            await trx('products').which('id', productId).del();

            return { success: true };
        });

        result ? res.status(204).send() : res.status(404).send();
    } catch(err) { next(err); }
};
