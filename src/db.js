const mysql = require('mysql')
const db = mysql.createConnection({
host: "dbcomuni.cbk8uqwo8kd7.eu-west-3.rds.amazonaws.com",
user: "admin",
password: "progettoReact",
database:"comuni",
port: 3306, 
});

module.exports = db;