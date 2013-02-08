# mongoose = require "mongoose"
# configDB = require("./../config/config") "test"
# Usuario = require "./../models/usuarioModel"
# should = require "should"
# sys = require "sys"
# DocumentObjectId = mongoose.Types.ObjectId

# mongoose.connect configDB.host, configDB.database




# express = require "./../../"
# request = require "./support/http"

# describe "app", ->
# 	describe ".request", ->
# 		it "should extend the request prototype", (done) ->
# 			app = express()
# 			app.request.querystring = ->
# 				require("url").parse(@url).query

# 			app.use (req, res) ->
# 				res.end req.querystring()

# 			usuarios = request(app).get("/usuarios")
# 			console.log JSON.stringify usuarios
# 			usuarios.expect "name=tobi", done




# describe "Usuario Model", ->
# 	after ->
# 		mongoose.disconnect()

# 	describe "Salvar", ->
# 		testCount = 0
		
# 		afterEach (done) ->
# 			testCount.should.eql 2
# 			Usuario.remove {}, ->
# 				done()

# 		it "Salvar model", (done) ->
# 			user =
# 				nome: "Meu Nome"
# 				email: "meuemail@com.br"
# 				senha: "senha123"

# 			usuarioModel = new Usuario user
# 			usuarioModel.on "save", (u) ->
# 				u.get("_id").should.be.an.instanceOf DocumentObjectId
# 				u.get("nome").should.eql user.nome
# 				u.get("email").should.eql user.email
# 				u.get("salt").should.be.ok
# 				u.get("senha").should.be.ok
# 				u.get("senha").should.not.eql user.senha
# 				testCount++
# 				done()

# 			usuarioModel.save (e, u) ->
# 				should.not.exist e
# 				should.exist u
# 				testCount++

# 	describe "Validacoes", ->
# 		usuarioAtual = undefined

# 		before (done) ->
# 			user =
# 				nome: "Meu Nome"
# 				email: "meuemail@com.br"
# 				senha: "senha123"

# 			usuarioModel = new Usuario user
# 			usuarioModel.save (e, u) ->
# 				done e  if e
# 				usuarioAtual = u
# 				done()


# 		after (done) ->
# 			Usuario.remove {}, ->
# 				done()


# 		it "Campos Requeridos", (done) ->
# 			usuarioModel = new Usuario()
# 			usuarioModel.save (e, u) ->
# 				should.exist e.errors.nome
# 				should.exist e.errors.email
# 				should.exist e.errors.senha
# 				should.exist e.errors.salt
# 				should.not.exist u
# 				done()


# 		it "Validar Senha", ->
# 			usuarioAtual.passValidate("senha123").should.ok
# 			usuarioAtual.passValidate("otherSenha123").should.not.ok

# 		it "Buscar por E-mail existente", (done) ->
# 			Usuario.findByEmail "meuemail@com.br", ((u) ->
# 				should.exist u
# 				done()
# 			), done

# 		it "Buscar por E-mail nao existente", (done) ->
# 			Usuario.findByEmail "noemail@com.br", ((u) ->
# 				should.not.exist u
# 				done()
# 			), done
