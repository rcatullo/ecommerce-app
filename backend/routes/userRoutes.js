const express = require('express');
const { param, body } = require('express-validator');
const { getSellerProducts, getSellerByUsername, createSellerProduct, updateSellerProduct, deleteSellerProduct } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const error = require('../middleware/errorMiddleware');
const validate = require('../middleware/valMiddleware');

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
    getSellerProducts
);

router.get('/username/:username',
    param('username').notEmpty(),
    getSellerByUsername
)

router.use(auth);

router.post('/:id',
    param('id').notEmpty().isInt(),
    body('name').notEmpty(),
    validatePrice,
    validate,
    createSellerProduct
);

router.put('/:id/:productId',
    param('id').notEmpty().isInt(),
    param('productId').notEmpty().isInt(),
    validatePrice,
    validate,
    updateSellerProduct
)

router.delete('/:id/:productId',
    param('id').notEmpty().isInt(),
    param('productId').notEmpty().isInt(),
    validate,
    deleteSellerProduct
);

router.use(error)

module.exports = router;
