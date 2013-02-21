module.exports = (callback) ->
	# mongoose = require 'mongoose'
	# environmentConf = require('./server/config/environment')(environment)
	express = require 'express'
	app = express()

	require('./server/config') app, express, __dirname
	require('./server/router') app
	require('./server/controllers/loginController') app
	require('./server/controllers/usuarioController') app

	callback(app)

	# mongoose.connect environmentConf.host, environmentConf.database

	# app.get '/', (req, res) ->
	# 	res.redirect '/index.html'

	# app.listen port
	# console.log "Rodando na porta 3000"
