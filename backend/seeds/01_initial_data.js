/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // clear tables first (order matters if you have FKs)
  await knex('cart_items').del();
  await knex('products').del();
  await knex('users').del();
  
  // insert a demo user
  await knex('users').insert([
    { username: 'demo', password_hash: 'hashed_pw_here', email: 'demo@example.com' }
  ]);

  // insert some products
  await knex('products').insert([
    { name: 'T‑shirt', description: 'Comfortable cotton tee', price: 19.99 },
    { name: 'Mug',    description: 'Ceramic coffee mug',      price: 9.99 }
  ]);
};
