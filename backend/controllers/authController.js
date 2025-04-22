const knex = require('../config/db');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isSeller = req.query.seller === 'true';

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const [user] = await knex('users')
        .insert({ 
          username, 
          email, 
          password_hash: await bcrypt.hash(password, 10),
          is_seller: isSeller,
          email_verified: false,
          email_verification_token: emailVerificationToken
        })
        .returning(['id', 'username', 'email', 'is_seller', 'email_verified']);

    // Send verification email
    await sendVerificationEmail(email, emailVerificationToken);

    delete user.password_hash;
    
    res.status(201).json({ user: user, message: 'Signup successful. Please check your email to verify your account.' });
  } catch(err) {
    // Handle unique violation error (Postgres error code 23505)
    if (err.code === '23505') {
      let message = 'Email or username already in use.';
      if (err.detail && err.detail.includes('email')) {
        message = 'Email already in use.';
      } else if (err.detail && err.detail.includes('username')) {
        message = 'Username already in use.';
      }
      return res.status(409).json({ error: message });
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await knex('users').where({ email }).first();
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!user.email_verified) return res.status(403).json({ error: 'Please verify your email before logging in.' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    delete user.password_hash;

    return res.json({ token, user: user });
  } catch(err){ next(err); }
};

exports.me = async (req, res, next) => {
  try {
    const user = await knex('users')
      .where({ id: req.user.id })
      .first();
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    delete user.password_hash;
    res.json({ user: user });
  } catch(err){ next(err); }
}

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Verification token missing.' });

    const user = await knex('users').where({ email_verification_token: token }).first();
    if (!user) return res.status(400).json({ error: 'Invalid or expired verification token.' });

    await knex('users')
      .where({ id: user.id })
      .update({ email_verified: true, email_verification_token: null });

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch(err){ next(err); }
}