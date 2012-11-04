var UsuarioModel = require('./usuarioModel');
var sys = require('sys');
var login = require('./../login/login');

module.exports = function(app) {
	app.post('/usuario', function(req, res) {
		var usuarioPost = req.body;

		if(usuarioPost.senha != usuarioPost.confirmacaoSenha) {
			res.send({
				errors: {
					confirmacaoSenha: {
						message: 'Confirmação de senha incorreta.',
						path: 'confirmacaoSenha'
					}
				}
			});
			return;
		}

		var usuarioModel = new UsuarioModel(usuarioPost);
		usuarioModel.save(function(e, o) {
			if(e) res.send(e);
			else res.send(o);
		});
	});

	app.get('/usuario', function(req, res) {
		var usuarioModel = new UsuarioModel(usuarioPost);
		usuarioModel.find({}, function(e, o) {
			if(e) res.send(e);
			else res.send(o);
		});
	});

	app.get('/usuario/:id', function(req, res) {
		var usuarioModel = new UsuarioModel(usuarioPost);
		usuarioModel.findById(req.params.id, function(e, o) {
			if(e) res.send(e);
			else res.send(o);
		});
	});

	app.put('/usuario/:id', function(req, res) {
		var usuarioPost = req.body;

		var usuarioModel = new UsuarioModel(usuarioPost);
		usuarioModel.save(function(e, o) {
			if(e) res.send(e);
			else res.send(o);
		});
	});

	app.delete('/usuario/:id', function(req, res) {		
		var usuarioModel = new UsuarioModel(usuarioPost);
		usuarioModel.findById(req.params.id, function(e, o) {
			if(e) res.send(e);
			else {
				o.remove(function());
			};
		});
	});
}