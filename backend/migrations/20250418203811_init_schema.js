/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password_hash').notNullable();
      tbl.string('email', 256).notNullable().unique();
    })
    .createTable('products', tbl => {
      tbl.increments('id');
      tbl.string('name').notNullable();
      tbl.text('description');
      tbl.decimal('price', 10, 2).notNullable();
    })
    .createTable('cart_items', tbl => {
      tbl.increments('id');
      tbl.integer('user_id').unsigned().notNullable()
         .references('id').inTable('users')
         .onDelete('CASCADE');
      tbl.integer('product_id').unsigned().notNullable()
         .references('id').inTable('products');
      tbl.integer('quantity').unsigned().notNullable();
    });
    // you can chain more tables (orders, order_items) here
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // reverse order of creation
  return knex.schema
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('cart_items')
    .dropTableIfExists('products')
    .dropTableIfExists('users');
};

