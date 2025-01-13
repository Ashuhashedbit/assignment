const mysql = require('mysql2');


module.exports = mysql.createConnection({
    host: '162.241.85.140',
    user: 'codeapzu_schooladmin',
    password: 'schooladmin',
    database: 'codeapzu_school'
});