sys = require("sys")
usuarioModel = require("./../usuario/usuarioModel")
crypt = require("./../seguranca/criptografia")

module.exports =
	makeLogin: (req, res) ->
		email = req.body.email
		senha = req.body.senha
		usuarioModel.findByEmail email, ((usuario) ->
			unless usuario
				res.send 500,
					err: "Usuário não encontrado."

			else if usuario.passValidate(senha)
				sessaoUsuario =
					sID: req.sessionID
					userID: usuario.id
					userName: usuario.nome
					userMail: usuario.email
					token: crypt.gerarSessionToken(req)

				req.session.user = sessaoUsuario
				res.send 200
			else
				res.send 500,
					err: "Senha não corresponde."

		), (erro) ->
			res.send 500,
				err: erro

	requestValidate: (req) ->
		return false  unless req.session.user
		true  if crypt.gerarSessionToken(req) is req.session.user.token