const knex = require('../config/db');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, store_name, store_description } = req.body;
    const isSeller = req.query.seller === 'true';
    
    const result = await knex.transaction(async trx => {
      const [user] = await trx('users')
        .insert({ 
          username, 
          email, 
          password_hash: await bcrypt.hash(password, 10),
          is_seller: isSeller 
        })
        .returning(['id', 'username', 'email', 'is_seller']);

      if (isSeller) {
        const [sellerProfile] = await trx('seller_profiles')
          .insert({ 
            user_id: user.id, 
            store_name, 
            store_description 
          })
          .returning('*');
        return { ...user, seller_profile: sellerProfile };
      }

      return user;
    });
    
    res.status(201).json(result);
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

exports.me = async (req, res, next) => {
  try {
    const user = await knex('users')
      .where({ id: req.user.id })
      .first();
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isSeller = user.is_seller;
    if (!isSeller) {
      return res.json(user);
    }
    const sellerProfile = await knex('seller_profiles')
      .where({ user_id: user.id })
      .first();

    res.json({ ...user, seller_profile: sellerProfile });
  } catch(err){ next(err); }
}