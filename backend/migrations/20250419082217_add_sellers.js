exports.up = function(knex) {
    return knex.schema
        .alterTable('users', table => {
            table.boolean('is_seller').defaultTo(false);
        })
        .createTable('seller_profiles', table => {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable()
                .references('id').inTable('users')
                .onDelete('CASCADE');
            table.string('store_name').notNullable();
            table.text('store_description');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .alterTable('products', table => {
            table.integer('seller_id').unsigned()
                .references('id').inTable('seller_profiles')
                .onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .alterTable('products', table => {
            table.dropColumn('seller_id');
        })
        .dropTableIfExists('seller_profiles')
        .alterTable('users', table => {
            table.dropColumn('is_seller');
        });
};
