const keys = require("../config/keys");
const Pool = require("pg").Pool;
const connection = process.env.NODE_ENV === 'production' ? { connectionString: process.env.DATABASE_URL} : {
  user: keys.PGUSER,
  host: keys.PGHOST,
  database: keys.PGDATABASE,
  password: keys.PGPASSWORD,
  port: keys.PGPORT
}

const pool = new Pool(connection);

module.exports = pool;
