var express = require('express');
var router = express.Router();

var search = require('../models/search');

router.get('/search', function (req, res, next) {
	search();
	res.render('index', {title: 'Search'});
});

module.exports = router;
