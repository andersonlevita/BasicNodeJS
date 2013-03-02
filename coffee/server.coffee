module.exports = (callback) ->
	express = require 'express'
	app = express()

	require('./server/config') app, express, __dirname
	require('./server/router') app
	require('./server/controllers/loginController') app
	require('./server/controllers/usuarioController') app

	callback(app)
