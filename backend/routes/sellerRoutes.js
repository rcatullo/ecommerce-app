const express = require('express');
const { param, body } = require('express-validator');
const { getSellerProducts, createSellerProduct, deleteSellerProduct } = require('../controllers/sellerController');
const auth = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/valMiddleware');

const router = express.Router();

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
    body('price').isNumeric().isFloat({ gt: 0 }),
    body('description').notEmpty(),
    body('image_url').optional().isURL(),
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
