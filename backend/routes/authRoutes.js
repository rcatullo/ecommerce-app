const express = require('express');
const { body } = require('express-validator');
const { signup, login, me } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup',
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('store_name').if((value, { req }) => req.query.seller === 'true').notEmpty(),
  body('store_description').optional(),
  signup
);

router.post('/login',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty(),
  login
);

router.use(auth);

router.get('/me', me);

module.exports = router;
