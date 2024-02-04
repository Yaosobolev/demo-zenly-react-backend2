const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "map_user",
//   password: "admin",
//   port: 5432,
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

module.exports = pool;
