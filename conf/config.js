const mysql = require('mysql');

const mysqConfig = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'usuarios',
};

module.exports = mysql.createPool(mysqConfig)
