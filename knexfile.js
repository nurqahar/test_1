// Update with your config settings.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
    },

    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations/",
    },
  },
};
