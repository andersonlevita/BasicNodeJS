UsuarioModel = require './usuarioModel'
sys = require 'sys'
login = require './../login/login'

module.exports = (app) ->
	app.post '/usuario', (req, res) ->
		unless req.body.senha is req.body.confirmacaoSenha
			res.send 412,
				errors: 
					confirmacaoSenha: 
						message: 'Confirmação de senha incorreta.'
						path: 'confirmacaoSenha'
			return

		usuarioModel = new UsuarioModel req.body
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
		UsuarioModel.findById req.params.id, (e, o) ->
			if e 
				res.send 412, e
			else 
				o.nome = req.body.nome #Fazer isso automaticamente
				o.email = req.body.email
				o.senha = req.body.senha

				o.save (e, o) ->
					if e then res.send 412, e
					else res.send o

	app.delete '/usuario/:id', (req, res) ->
		UsuarioModel.findById req.params.id, (e, o) ->
			if e 
				res.send 412, e
			else
				o.remove (e, o) ->
					if e then res.send 412, e
					else 
						res.send o