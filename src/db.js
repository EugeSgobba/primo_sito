const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'dbcomuni.cbk8uqwo8kd7.eu-west-3.rds.amazonaws.com',
  user: 'admin',
  password: 'progettoReact',
  database: 'comuni',
});

module.exports = db;