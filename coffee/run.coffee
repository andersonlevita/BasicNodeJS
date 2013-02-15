require('./server') (app) ->	
	mongoose = require 'mongoose'
	environment = require('./server/config/environment')()


# environment = require('./server/config/environment')()
# express = require 'express'
# app = express()

# require('./server/config') app, express, __dirname
# require('./server/router') app
# require('./server/controllers/usuarioController') app

	mongoose.connect environment.host, environment.database

	app.get '/', (req, res) ->
		res.redirect '/index.html'

	app.listen 3000
	console.log "Rodando na porta 3000"