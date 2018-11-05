var connection = require('../db');

var methods = {};

methods.query = function (query, limit, offset, callback) {
	connection.query(
		'SELECT * FROM pages WHERE MATCH (title) AGAINST (? IN BOOLEAN MODE) LIMIT ? OFFSET ?',
		[query, limit, offset],
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