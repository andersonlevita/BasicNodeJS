sys = require "sys"
mongoose = require "mongoose"
configDB = require("./../config/environment") "test"
Usuario = require "./../models/usuarioModel"
msgHelper = require "./../helpers/message"
should = require "should"

db = undefined

mongoose.connection.on "error", (e) ->
	console.log "Conexão: #{e}"

request = require "./support/http"
app = null
require("./../../server") (appIn) ->
	app = appIn
	appIn.listen 3001

describe "Login Controller", ->
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
			db.connection.close ->
				done()

	it "Login válido", (done) ->
		request(app)
			.post('/login')
			# .set('Content-Type','application/json')
			.send({email: 'login@com.br', senha: 'login'})
			.expect(200, (e, o) ->				
				# sys.puts sys.inspect o
				done())

	it "Login inválido", (done) ->
		request(app)
			.post('/login')
			.send({email: 'login1@com.br', senha: 'login'})
			.expect(412, done)

	it "Senha inválida", (done) ->
		request(app)
			.post('/login')
			.send({email: 'login@com.br', senha: 'login1'})
			.expect(412, done)

	it "Logout inválido", (done) ->
		request(app)
			.post('/logout')
			.expect(412, done)