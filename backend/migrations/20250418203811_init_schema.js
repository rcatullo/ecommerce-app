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
      tbl.boolean('is_seller').defaultTo(false);
      tbl.boolean('email_verified').defaultTo(false);
      tbl.string('email_verification_token', 128);
    })
    .createTable('products', tbl => {
      tbl.increments('id');
      tbl.string('name').notNullable();
      tbl.text('description');
      tbl.decimal('price', 10, 2).notNullable();
      tbl.integer('user_id').unsigned()
      .references('id').inTable('users')
      .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('products')
    .dropTableIfExists('users');
};

