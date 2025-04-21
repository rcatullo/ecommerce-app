const knex = require('../config/db');

exports.getSellerProducts = async (req, res, next) => {
    try {
        const { storeName } = req.params;
        const products = await knex('products')
            .join('seller_profiles', 'products.seller_id', 'seller_profiles.id')
            .where('seller_profiles.store_name', storeName)
            .select('products.*');
        
        res.json(products);
    } catch(err) { next(err); }
};

exports.createSellerProduct = async (req, res, next) => {
    try {
        const { storeName } = req.params;
        const seller = await knex('seller_profiles')
            .where('store_name', storeName)
            .first();

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        if (seller.user_id !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const [product] = await knex('products')
            .insert({
                ...req.body,
                seller_id: seller.id
            })
            .returning(['id', 'name', 'description', 'price', 'image_url']);

        res.status(201).json(product);
    } catch(err) { next(err); }
};

exports.deleteSellerProduct = async (req, res, next) => {
    try {
        const { storeName, productId } = req.params;
        const seller = await knex('seller_profiles')
            .where('store_name', storeName)
            .first();

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        if (seller.user_id !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const deleted = await knex('products')
            .where({
                id: productId,
                seller_id: seller.id
            })
            .del();

        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(204).send();
    } catch(err) { next(err); }
};
