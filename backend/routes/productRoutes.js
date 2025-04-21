const express = require('express');
const { body, param } = require('express-validator');
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/valMiddleware');
const error = require('../middleware/errorMiddleware');
const router = express.Router();

const validatePrice = body('price')
    .notEmpty()
    .isNumeric()
    .isFloat({ gt: 0 })
    .custom(value => {
        if (value > 10000) {
            throw new Error('Price cannot exceed 10000');
        }
        return true;
    });

router.get('/:id', 
    param('id').notEmpty().isInt(),
    getProduct
);

router.get('/', getAllProducts);

router.use(auth);

router.post('/',
    body('name').notEmpty(),
    validatePrice,
    validateRequest,
    createProduct
);

router.put('/:id',
    param('id').notEmpty().isInt(),
    body('name').notEmpty(),
    validatePrice,
    validateRequest,
    updateProduct
);

router.delete('/:id',
    param('id').notEmpty().isInt(),
    deleteProduct
);

router.use(error);

module.exports = router;