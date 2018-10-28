var config = require('config-node')({
	db_host: process.env.DB_HOST || 'development',
	db_db: process.env.DB_DB || 'development',
	db_user: process.env.DB_USER || 'development',
	db_pass: process.env.DB_PASS || 'development'
});

module.exports = config;