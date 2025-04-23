/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('products').del();
  await knex('users').del();
  
  // insert a demo user
  await knex('users').insert([
    { username: 'alice', password_hash: '$2b$10$yriH/NOu8xo868enyA5VW.Au25yr9fqBEzdq9pfOCX9ySLtRKijtW', email: 'alice@example.com', is_seller: true, email_verified: true },
    { username: 'bob', password_hash: '$2b$10$yriH/NOu8xo868enyA5VW.Au25yr9fqBEzdq9pfOCX9ySLtRKijtW', email: 'bob@example.com', is_seller: true, email_verified: true }
  ]);

  // insert some products
  await knex('products').insert([
    { name: 'T‑shirt', description: 'Comfortable cotton tee', price: 19.99, user_id: 1 },
    { name: 'Mug',    description: 'Ceramic coffee mug',      price: 9.99, user_id: 2 },
    { name: 'T‑shirt1', description: 'Comfortable cotton tee', price: 19.99, user_id: 1 },
    { name: 'Mug1',    description: 'Ceramic coffee mug',      price: 9.99, user_id: 2 },
    { name: 'T‑shirt2', description: 'Comfortable cotton tee', price: 19.99, user_id: 1 },
    { name: 'Mug2',    description: 'Ceramic coffee mug',      price: 9.99, user_id: 2 }
  ]);
};
