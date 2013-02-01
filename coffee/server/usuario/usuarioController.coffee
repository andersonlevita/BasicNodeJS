UsuarioModel = require './usuarioModel'
sys = require 'sys'
login = require './../login/login'

module.exports = (app) ->
	app.post '/usuario', (req, res) ->
		usuarioPost = req.body

		unless usuarioPost.senha is usuarioPost.confirmacaoSenha
			res.send 412,
				errors: 
					confirmacaoSenha: 
						message: 'Confirmação de senha incorreta.'
						path: 'confirmacaoSenha'
			return

		usuarioModel = new UsuarioModel usuarioPost
		usuarioModel.save (e, o) ->
			if e then res.send 412, e
			else res.send o

	app.get '/usuarios', (req, res) ->
		UsuarioModel.find {}, (e, o) ->
			if e then res.send 412, e
			else res.send o

	app.get '/usuario/:id', (req, res) ->
		UsuarioModel.findById req.params.id, (e, o) ->
			if e then res.send 412, e
			else res.send o

	app.put '/usuario/:id', (req, res) ->
		usuarioPost = req.body

		UsuarioModel.findById req.params.id, (e, o) ->
			if e 
				res.send 412, e
			else 
				o.nome = usuarioPost.nome
				o.email = usuarioPost.email
				o.senha = usuarioPost.senha

				o.save (e, o) ->
					if e then res.send 412, e
					else res.send o

	app.delete '/usuario/:id', (req, res) ->		
		console.log 'entrou no delete'
		UsuarioModel.findById req.params.id, (e, o) ->
			if e 
				res.send 412, e
			else
				console.log 'ok' 
				# o.save (e, o) ->
				# 	if e then res.send 412, e
				# 	else res.send o