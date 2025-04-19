const express = require('express');
const { body, param } = require('express-validator');
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const errorMiddleware = require('../middleware/errorMiddleware');
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

router.post('/createProduct',
    body('name').notEmpty(),
    validatePrice,
    errorMiddleware,
    createProduct
);

router.put('/updateProduct/:id',
    param('id').notEmpty().isInt(),
    body('name').notEmpty(),
    validatePrice,
    errorMiddleware,
    updateProduct
);

router.delete('/deleteProduct/:id',
    param('id').notEmpty().isInt(),
    deleteProduct
);

router.get('/getProduct/:id',
    param('id').notEmpty().isInt(),
    getProduct
);

router.get('/getAllProducts',
    getAllProducts
);

module.exports = router;