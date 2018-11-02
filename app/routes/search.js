var express = require('express');
var router = express.Router();

var search = require('../models/search');

router.get('/', function (req, res, next) {
	search.query(req.query['query'], 0, function (error, results) {
		if (error) {
			res.render('error', {status: 500});
		} else {
			res.render('search', {results: results});
		}
	});
});

module.exports = router;
