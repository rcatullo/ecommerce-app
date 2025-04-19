/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('orders', tbl => {
            tbl.increments('id');
            tbl.integer('user_id').unsigned().notNullable()
            .references('id').inTable('users')
            .onDelete('CASCADE');
            tbl.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('order_items', tbl => {
            tbl.increments('id');
            tbl
            .integer('order_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('orders')
            .onDelete('CASCADE');
            tbl
            .integer('product_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('products');
            tbl.integer('quantity').unsigned().notNullable();
            tbl.decimal('unit_price', 10, 2).notNullable();    // ← snapshot price
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('order_items')
        .dropTableIfExists('orders')
};
