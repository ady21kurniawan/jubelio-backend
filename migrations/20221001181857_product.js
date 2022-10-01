/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
    .createTable("products", (table) => {
        table.increments('id')
        table.string("sku").unique()
        table.string("name")
        table.string("images")
        table.string("price")
        table.string("description")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
