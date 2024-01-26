const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "corso",
database:"dbtreni" 
})

module.exports = db;