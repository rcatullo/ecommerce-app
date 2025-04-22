const express = require('express');
const { body, param } = require('express-validator');
const { getProduct, getSellerByProductId, getAllProducts } = require('../controllers/productController');
const error = require('../middleware/errorMiddleware');
const router = express.Router();

router.get('/:id', 
    param('id').notEmpty().isInt(),
    getProduct
);

router.get('/users/:id',
    param('id').notEmpty().isInt(),
    getSellerByProductId
);

router.get('/', getAllProducts);

router.use(error);

module.exports = router;