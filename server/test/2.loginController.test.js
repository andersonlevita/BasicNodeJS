// Generated by CoffeeScript 1.4.0
(function() {
  var Usuario, app, configDB, db, mongoose, msgHelper, request, should, sys;

  sys = require("sys");

  mongoose = require("mongoose");

  configDB = require("./../config/environment")("test");

  Usuario = require("./../models/usuarioModel");

  msgHelper = require("./../helpers/message");

  should = require("should");

  db = void 0;

  mongoose.connection.on("error", function(e) {
    return console.log("Conexão: " + e);
  });

  request = require("./support/http");

  app = null;

  require("./../../server")(function(appIn) {
    app = appIn;
    return appIn.listen(3001);
  });

  describe("Login Controller", function() {
    var user;
    user = {
      nome: "Usuario Login Teste",
      email: "login@com.br",
      senha: "login"
    };
    before(function(done) {
      db = mongoose.connect(configDB.host, configDB.database);
      return Usuario.remove({}, function() {
        var usuarioModel;
        usuarioModel = new Usuario(user);
        return usuarioModel.save(function(e, u) {
          should.not.exist(e);
          should.exist(u);
          return done();
        });
      });
    });
    after(function(done) {
      return db.connection.db.dropDatabase(function() {
        return db.connection.close(function() {
          return done();
        });
      });
    });
    it("Login válido", function(done) {
      return request(app).post('/login').send({
        email: 'login@com.br',
        senha: 'login'
      }).expect(200, function(e, o) {
        return done();
      });
    });
    it("Login inválido", function(done) {
      return request(app).post('/login').send({
        email: 'login1@com.br',
        senha: 'login'
      }).expect(412, done);
    });
    it("Senha inválida", function(done) {
      return request(app).post('/login').send({
        email: 'login@com.br',
        senha: 'login1'
      }).expect(412, done);
    });
    return it("Logout inválido", function(done) {
      return request(app).post('/logout').expect(412, done);
    });
  });

}).call(this);
