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
        const userData = { ...user, seller_profile: sellerProfile };
        // Remove sensitive info if present
        delete userData.password_hash;
        return userData;
      }
      // Remove sensitive info if present
      delete user.password_hash;
      return user;
    });
    
    res.status(201).json({ user: result });
  } catch(err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await knex.transaction(async trx => {
      const user = await trx('users').where({ email }).first();
      if (!user) return null;
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return null;

      const token = jwt.sign(
        { id: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      let userData = { ...user };
      if (user.is_seller) {
        const sellerProfile = await trx('seller_profiles')
          .where({ user_id: user.id })
          .first();
        userData.seller_profile = sellerProfile;
      }
      // Remove sensitive info
      delete userData.password_hash;

      return { token, user: userData };
    });
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(result);
  } catch(err){ next(err); }
};

exports.me = async (req, res, next) => {
  try {
    const result = await knex.transaction(async trx => {
      const user = await trx('users')
        .where({ id: req.user.id })
        .first();
      if (!user) return null;

      const isSeller = user.is_seller;
      let userData = { ...user };
      if (isSeller) {
        const sellerProfile = await trx('seller_profiles')
          .where({ user_id: user.id })
          .first();
        userData.seller_profile = sellerProfile;
      }
      // Remove sensitive info if present
      delete userData.password_hash;
      return userData;
    });
    if (!result) return res.status(404).json({ error: 'User not found' });
    res.json({ user: result });
  } catch(err){ next(err); }
}