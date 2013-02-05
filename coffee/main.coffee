mongoose = require 'mongoose'
config = require('./server/config/config')()
express = require 'express'
app = express()

require('./server/config') app, express, __dirname
require('./server/router') app
require('./server/controllers/usuarioController') app

mongoose.connect config.host, config.database

app.get '/', (req, res) ->
	res.redirect '/index.html'

app.listen 3000
console.log "Rodando na porta 3000"