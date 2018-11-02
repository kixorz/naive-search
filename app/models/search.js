var connection = require('../db');

var methods = {};

methods.query = function (query, offset, callback) {
	connection.query(
		'SELECT * FROM pages WHERE MATCH (title) AGAINST (? IN BOOLEAN MODE) LIMIT 10 OFFSET ?',
		[query, offset],
		function (err, rows, fields) {
			if (err) {
				console.error('Search failed:', err);
				callback(err);
			} else {
				callback(null, rows);
			}
		});
};

module.exports = methods;