const pg = require("pg");

// A "pool" represents our connection to the database
const pool = new pg.Pool({
  // Name of the database
  // This is the only required parameter
  database: "weekend-to-do-app",
});

module.exports = pool;
