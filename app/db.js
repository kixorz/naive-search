var config = require('./config');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: config.db_host,
	user: config.db_user,
	password: config.db_pass,
	database: config.db_db
});

connection.connect();

var close = function() {
	console.info('Closing DB connection');
	connection.end();
};

process.on('exit', close);

module.exports = connection;