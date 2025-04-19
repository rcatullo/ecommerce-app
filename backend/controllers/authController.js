const knex = require('../config/db');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const [user] = await knex('users')
      .insert({ username, email, password_hash: hash })
      .returning(['id','username','email']);
    res.status(201).json(user);
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
    res.json({ token });
  } catch(err){ next(err); }
};
