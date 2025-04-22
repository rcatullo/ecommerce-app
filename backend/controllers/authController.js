const knex = require('../config/db');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isSeller = req.query.seller === 'true';
    
    const [user] = await knex('users')
        .insert({ 
          username, 
          email, 
          password_hash: await bcrypt.hash(password, 10),
          is_seller: isSeller 
        })
        .returning(['id', 'username', 'email', 'is_seller']);

    delete user.password_hash;
    
    res.status(201).json({ user: user });
  } catch(err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await knex('users').where({ email }).first();
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
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