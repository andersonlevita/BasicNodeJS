require('./server') (app) ->	
	mongoose = require 'mongoose'
	environment = require('./server/config/environment')()

	mongoose.connect environment.host, environment.database

	app.get '/', (req, res) ->
		res.redirect '/index.html'

	app.listen 3000
	console.log "Rodando na porta 3000"