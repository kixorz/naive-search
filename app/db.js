var config = require('config-node');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: config.db_host,
	user: config.db_user,
	password: config.db_pass,
	database: config.db_db
});

connection.connect();

process.on('exit', function() {
	connection.end();
});

module.exports = connection;