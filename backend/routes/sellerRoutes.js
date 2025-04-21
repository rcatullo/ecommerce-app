const express = require('express');
const { param, body } = require('express-validator');
const { getSellerProducts, createSellerProduct, deleteSellerProduct } = require('../controllers/sellerController');
const auth = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/valMiddleware');

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

// Public route to get seller's products
router.get('/:storeName/products',
    param('storeName').notEmpty(),
    getSellerProducts
);

// Protected routes
router.use(auth);

router.post('/:storeName/products',
    param('storeName').notEmpty(),
    body('name').notEmpty(),
    validatePrice,
    validateRequest,
    createSellerProduct
);

router.delete('/:storeName/products/:productId',
    param('storeName').notEmpty(),
    param('productId').isInt(),
    validateRequest,
    deleteSellerProduct
);

module.exports = router;
