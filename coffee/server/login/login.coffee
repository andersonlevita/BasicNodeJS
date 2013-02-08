sys = require "sys"
usuarioModel = require "./../usuario/usuarioModel"
crypt = require "./../seguranca/criptografia"
responseHelper = require "./../helpers/response"

module.exports =
	login: (req, res) ->
		email = req.body.email
		senha = req.body.senha
		usuarioModel.findByEmail email, ((usuario) ->
			unless usuario			
				console.log "Usuário não encontrado."
				responseHelper.sendError res, "Usuário não encontrado."

			else if usuario.passValidate(senha)
				sessaoUsuario =
					sID: req.sessionID
					userID: usuario.id
					userName: usuario.nome
					userMail: usuario.email
					token: crypt.gerarSessionToken(req)

				req.session.user = sessaoUsuario
				console.log "Autenticado."
				res.send 200
			else
				console.log "Senha não corresponde."
				responseHelper.sendError res, "Senha não corresponde."

		), (erro) ->
			console.log erro
			responseHelper.sendError res, erro

	requestValidate: (req) ->
		sys.puts sys.inspect req.session.user
		return false  unless req.session.user
		return crypt.gerarSessionToken(req) is req.session.user.token

	logout: (req, res) ->
		console.log "Entrou no logout"
		return unless @requestValidate req
		sys.puts sys.inspect req.session.user
		delete req.session.user
		sys.puts sys.inspect req.session.user
		console.log "Realizou logout"
		res.send 200