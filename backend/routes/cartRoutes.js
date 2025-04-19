const express = require('express');
const { body, param } = require('express-validator');
const { getCart, addToCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');
const error = require('../middleware/errorMiddleware');
const router = express.Router();

router.use(auth);

router.get('/', getCart);

router.post('/',
    body('userId').notEmpty().isInt(),
    body('productId').notEmpty().isInt(),
    body('quantity').notEmpty().isInt(),
    addToCart
);

router.put('/:id',
    param('id').notEmpty().isInt(),
    body('quantity').notEmpty().isInt(),
    updateCartItem
);

router.delete('/:id',
    param('id').notEmpty().isInt(),
    deleteCartItem
);

router.use(error);

module.exports = router;