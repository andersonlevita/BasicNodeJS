# login = require "./../login/login"
sys = require "sys"
usuarioModel = require "./../models/usuarioModel"
crypt = require "./../helpers/cryptography"
responseHelper = require "./../helpers/response"
messageHelper = require "./../helpers/message"
loginHelper = require "./../helpers/login"

module.exports = (app) ->
	app.post "/login", (req, res) ->
		email = req.body.email
		senha = req.body.senha
		usuarioModel.findByEmail email, ((usuario) ->
			unless usuario			
				responseHelper.sendError res, messageHelper.loginFail
			else if usuario.passValidate(senha)
				sessaoUsuario =
					sID: req.sessionID
					userID: usuario.id
					userName: usuario.nome
					userMail: usuario.email
					token: crypt.sessionTokenGenerate(req)
				req.session.user = sessaoUsuario
				res.send 200
			else
				responseHelper.sendError res, messageHelper.loginFail
		), (erro) ->
			responseHelper.sendError res, erro

	app.post "/logout", loginHelper.logged, (req, res) ->
		delete req.session.user
		res.send 200