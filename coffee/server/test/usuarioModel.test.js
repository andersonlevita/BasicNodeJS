var mongoose = require('mongoose');
var configDB = require('./../config/config')('test');
var Usuario = require('./../models/usuarioModel');
var should = require('should');
var sys = require('sys');
var DocumentObjectId = mongoose.Types.ObjectId;

mongoose.connect(configDB.host, configDB.database);

describe('Usuario Model', function() {

	after(function() {
		mongoose.disconnect();
	});

	describe('Validacoes', function() {
		var usuarioAtual;

		before(function(done) {
			var user = {
				nome: 'Meu Nome',
				email: 'meuemail@com.br',
				senha: 'senha123'
			};
			var usuarioModel = new Usuario(user);
			usuarioModel.save(function(e, u) {
				if(e) done(e);
				usuarioAtual = u;
				done();
			});
		});

		after(function(done) {
			Usuario.remove({}, function() {
				done();
			});
		});

		it('Campos Requeridos', function(done) {
			var usuarioModel = new Usuario();
			usuarioModel.save(function(e, u) {
				should.exist(e.errors.nome);
				should.exist(e.errors.email);
				should.exist(e.errors.senha);
				should.exist(e.errors.salt);
				should.not.exist(u);
				done();
			});
		});

		it('Validar Senha', function() {
			usuarioAtual.passValidate('senha123').should.ok;
			usuarioAtual.passValidate('otherSenha123').should.not.ok;
		});

		it('Buscar por E-mail existente', function(done) {
			Usuario.findByEmail('meuemail@com.br', function(u) {
				should.exist(u);
				done();
			}, done);
		});

		it('Buscar por E-mail nao existente', function(done) {
			Usuario.findByEmail('noemail@com.br', function(u) {
				should.not.exist(u);
				done();
			}, done);
		});
	});

	describe('Salvar', function() {
		var TestCount = 0;

		afterEach(function(done) {
			TestCount.should.eql(2);
			Usuario.remove({}, function() {
				done();
			});
		});

		it('Salvar model', function(done) {
			var user = {
				nome: 'Meu Nome',
				email: 'meuemail@com.br',
				senha: 'senha123'
			};

			var usuarioModel = new Usuario(user);

			usuarioModel.on('save', function(u) {
				u.get('_id').should.instanceof(DocumentObjectId);
				u.get('nome').should.eql(user.nome);
				u.get('email').should.eql(user.email);
				u.get('salt').should.be.ok;
				u.get('senha').should.be.ok;
				u.get('senha').should.not.eql(user.senha);
				TestCount++;
				done();
			});

			usuarioModel.save(function(e, u) {
				should.not.exist(e);
				should.exist(u);
				TestCount++;
			});
		});
	});
});