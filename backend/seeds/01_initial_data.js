/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('products').del();
  await knex('users').del();
  
  // insert a demo user
  await knex('users').insert([
    { username: 'alice', password_hash: 'hashed_pw_here', email: 'alice@example.com', is_seller: true },
    { username: 'bob', password_hash: 'hashed_pw_here', email: 'bob@example.com', is_seller: true }
  ]);

  // insert some products
  await knex('products').insert([
    { name: 'T‑shirt', description: 'Comfortable cotton tee', price: 19.99, user_id: 1 },
    { name: 'Mug',    description: 'Ceramic coffee mug',      price: 9.99, user_id: 2 }
  ]);
};
