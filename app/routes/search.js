var express = require('express');
var router = express.Router();

var search = require('../models/search');

router.get('/', function (req, res, next) {
	res.render('search', {title: 'Search'});
});

module.exports = router;
