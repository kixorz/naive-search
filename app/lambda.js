var serverless = require('aws-serverless-express');
var app = require('./app');

var server = serverless.createServer(app);

exports.handler = function (event, context) {
	return serverless.proxy(server, event, context);
};