const express = require('express');
const { body, param } = require('express-validator');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
const error = require('../middleware/errorMiddleware');
const router = express.Router();

router.use(auth);

router.post('/', createOrder);

router.get('/', getOrders);

router.get('/:id',
    param('id')
        .isInt()
        .withMessage('Order ID must be an integer'), 
    getOrderById
);

router.use(error);

module.exports = router;