const knex = require('../config/db');

exports.createOrder = async (req, res, next) => {
    const userId = req.user.id;
    const cartItems = await knex('cart_items').where({ user_id: userId });
    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });
  
    try {
      const result = await knex.transaction(async trx => {
        const [order] = await trx('orders')
          .insert({ user_id: userId })
          .returning('*');
        const orderItems = cartItems.map(ci => ({
          order_id: order.id,
          product_id: ci.product_id,
          quantity: ci.quantity,
          unit_price: ci.unit_price,
        }));
        await trx('order_items').insert(orderItems);
        await trx('cart_items').where({ user_id: userId }).del();
        return order;
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await knex('orders')
            .where({ user_id: userId })
            .orderBy('created_at', 'desc');
        res.json(orders);
    } catch(err) { next(err); }
}

exports.getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const order = await knex('orders')
            .where({ id: orderId, user_id: userId })
            .first();
        if (!order) return res.status(404).json({ error: 'Order not found' });
        const orderItems = await knex('order_items')
            .where({ order_id: orderId });
        res.json({ ...order, items: orderItems });
    } catch(err) { next(err); }
}
