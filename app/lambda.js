var serverless = require('aws-serverless-express');
var app = require('./app');

const binaryMimeTypes = [
	'application/javascript',
	'application/json',
	'application/octet-stream',
	'application/xml',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml',
	'text/comma-separated-values',
	'text/css',
	'text/html',
	'text/javascript',
	'text/plain',
	'text/text',
	'text/xml'
];

var server = serverless.createServer(app, null, binaryMimeTypes);

exports.handler = function (event, context) {
	return serverless.proxy(server, event, context);
};