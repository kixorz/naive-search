var express = require('express');
var router = express.Router();
var search = require('../models/search');

router.get('/', function (req, res, next) {
	var query = req.query['query'];
	var limit = 10;
	var offset = Math.max(parseInt(req.query['offset'], 10) || 0, 0);
	search.query(query, limit, offset, function (error, results) {
		if (error) {
			res.render('error', {
				error: {
					status: 500,
					message: 'Search failed'
				}
			});
		} else {
			var next;
			if(results.length == limit) {
				next = offset + limit;
			}
			var prev;
			if(offset > 0) {
				prev = offset - limit;
			}
			res.render('search', {
				query: query,
				next: next,
				prev: prev,
				results: results
			});
		}
	});
});

module.exports = router;
