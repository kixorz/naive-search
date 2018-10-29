var connection = require('../db');

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
	if (err) throw err;
	console.info('The solution is: ', rows[0].solution);
});