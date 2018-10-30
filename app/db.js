var mysql = require('mysql');

var connection = mysql.createConnection({
	database: process.env.DB_DB,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

connection.connect();

var close = function() {
	console.info('Closing DB connection');
	connection.end();
};

process.on('exit', close);

module.exports = connection;