const express = require('express');
const { body } = require('express-validator');
const { signup, login, me, verifyEmail } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup',
  body('username').notEmpty(),
  body('email')
    .isEmail()
    .custom(value => {
      if (!value.endsWith('@stanford.edu')) {
        throw new Error('Email must be a @stanford.edu address');
      }
      return true;
    }),
  body('password').isLength({ min: 6 }),
  body('store_name').if((value, { req }) => req.query.seller === 'true').notEmpty(),
  body('store_description').optional(),
  signup
);

router.get('/verify-email', verifyEmail);

router.post('/login',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty(),
  login
);

router.use(auth);

router.get('/me', me);

module.exports = router;
