const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456789',
  port: 5432,
  database: 'events',
})

module.exports = pool
