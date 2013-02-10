mongoose = require "mongoose"
configDB = require("./../config/config") "test"
Usuario = require "./../models/usuarioModel"
Login = require "./../login/login"
msgHelper = require "./../helpers/message"
should = require "should"
DocumentObjectId = mongoose.Types.ObjectId

db = undefined

mongoose.connection.on "error", (e) ->
	console.log "Conexão: #{e}"

describe "Login", ->
	user =
		nome: "Usuario Login Teste"
		email: "login@com.br"
		senha: "login"

	before (done) ->
		db = mongoose.connect configDB.host, configDB.database
		Usuario.remove {}, ->
			usuarioModel = new Usuario user
			usuarioModel.save (e, u) ->
				should.not.exist e
				should.exist u
				done()

	after (done) ->
		db.connection.db.dropDatabase () ->
			console.log "dropado"
			db.connection.close ->
				done()

	describe "Validacoes e Autenticacao", ->
		req = 
			body:
				email: "login_err@com.br"
				senha: "login"
			session: {}
			connection:
				remoteAddress: '127.0.0.1'
			headers: {}

		it "Email invalido", (done) ->
			Login.login req,
				send: (res, msg) ->
					res.should.eql 412
					msg.should.eql msgHelper.loginFail
					done()

		it "Senha invalida", (done) ->
			req.body.email = "login@com.br"
			req.body.senha = "login_err"

			Login.login req,
				send: (res, msg) ->
					res.should.eql 412
					msg.should.eql msgHelper.loginFail
					done()

		it "Autenticacao", (done) ->
			req.body.email = "login@com.br"
			req.body.senha = "login"

			Login.login req,
				send: (res, msg) ->
					res.should.eql 200
					should.exist req.session.user
					done()

		it "Validacao de request autenticado", (done) ->
			req.body.email = "login@com.br"
			req.body.senha = "login"

			Login.login req,
				send: (res, msg) ->
					(Login.requestValidate req).should.be.ok
					done()

		it "Validacao de request nao autenticado", (done) ->
			req.session = {}
			(Login.requestValidate req).should.not.be.ok
			done()

		it "Logout", (done) ->
			req.body.email = "login@com.br"
			req.body.senha = "login"

			Login.login req,
				send: (res, msg) ->
					(Login.requestValidate req).should.be.ok
					Login.logout req,
						send: (res, msg) ->
							(Login.requestValidate req).should.not.be.ok
							should.not.exist req.session.user
							done()
