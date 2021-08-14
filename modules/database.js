const SQL = require('mysql');

const db = SQL.createPool({
  host: 'localhost',
  password: '',
  user: 'root',
  database: 'auth',
  connectionLimit: 30
});


module.exports = db;