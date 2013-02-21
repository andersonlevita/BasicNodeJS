UsuarioModel = require './../models/usuarioModel'
resHelper = require './../helpers/response'

module.exports = (app) ->

	app.get '/usuarios', (req, res) ->
		UsuarioModel.find {}, (e, o) ->
			resHelper.defaultResponse res, e, o

	app.post '/usuario', (req, res) ->
		unless req.body.senha is req.body.confirmacaoSenha
			resHelper.sendError res,
				errors: 
					confirmacaoSenha: 
						message: 'Confirmação de senha incorreta.'
						path: 'confirmacaoSenha'
			return
		usuarioModel = new UsuarioModel req.body
		usuarioModel.save (e, o) ->
			resHelper.defaultResponse res, e, o

	app.get '/usuario/:id', (req, res) ->
		UsuarioModel.findById req.params.id, (e, o) ->
			resHelper.defaultResponse res, e, o

	app.put '/usuario/:id', (req, res) ->
		UsuarioModel.findById req.params.id, (e, o) ->
			if e 
				resHelper.sendError res, e
			else 
				o.nome = req.body.nome #Fazer isso automaticamente
				o.email = req.body.email
				o.senha = req.body.senha
				o.save (e, o) ->
					resHelper.defaultResponse res, e, o

	app.delete '/usuario/:id', (req, res) ->
		UsuarioModel.findById req.params.id, (e, o) ->
			if e 
				resHelper.sendError res, e
			else
				o.remove (e, o) ->
					resHelper.defaultResponse res, e, o