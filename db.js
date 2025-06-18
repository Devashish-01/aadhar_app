const mysql = require('mysql2/promise');
const config = require('./env.json');

const db = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,     // adjust based on load testing
  queueLimit: 0
});

module.exports = db;