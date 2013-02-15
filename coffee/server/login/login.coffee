sys = require "sys"
usuarioModel = require "./../usuario/usuarioModel"
crypt = require "./../security/cryptography"
responseHelper = require "./../helpers/response"
messageHelper = require "./../helpers/message"

module.exports =
	login: (req, res) ->
		# sys.puts sys.inspect req

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

	requestValidate: (req) ->
		return false  unless req.session.user
		return crypt.sessionTokenGenerate(req) is req.session.user.token

	logout: (req, res) ->
		return unless @requestValidate req
		delete req.session.user
		res.send 200