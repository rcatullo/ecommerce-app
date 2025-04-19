const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup',
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  signup
);

router.post('/login',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty(),
  login
);

module.exports = router;
