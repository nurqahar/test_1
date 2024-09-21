/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("email", "328").notNullable().unique();
      table.string("firstName", "255").notNullable();
      table.string("lastName", "255").notNullable();
      table.string("phoneNumber", "12").notNullable();
      table.string("password").notNullable();
      table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  