UsuarioModel = require './usuarioModel'
sys = require 'sys'
login = require './../login/login'

module.exports = (app) ->
	app.post '/usuario', (req, res) ->
		usuarioPost = req.body

		unless usuarioPost.senha is usuarioPost.confirmacaoSenha
			res.send
				errors: 
					confirmacaoSenha: 
						message: 'Confirmação de senha incorreta.'
						path: 'confirmacaoSenha'
			return

		usuarioModel = new UsuarioModel usuarioPost
		usuarioModel.save (e, o) ->
			if e then res.send e
			else res.send o

	app.get '/usuario', (req, res) ->
		usuarioModel = new UsuarioModel
		console.log "get usuario"
		usuarioModel.find {}, (e, o) ->
			if e then res.send e
			else res.send o

	app.get '/usuario/:id', (req, res) ->
		usuarioModel = new UsuarioModel
		console.log "get usuario :id"
		usuarioModel.findById req.params.id, (e, o) ->
			if e then res.send e
			else res.send o

	# app.put '/usuario/:id', (req, res) ->
	# 	usuarioPost = req.body
	# 	usuarioModel = new UsuarioModel usuarioPost
	# 	usuarioModel.save (e, o) ->
	# 		if e then res.send e
	# 		else res.send o

	# app.delete '/usuario/:id', (req, res) ->
	# 	usuarioModel = new UsuarioModel usuarioPost
	# 	usuarioModel.findById req.params.id, (e, o) ->
	# 		if e then	res.send e
	# 		else
	# 			o.remove (e) ->
	# 				if e then res.send e
	# 				else res.send o