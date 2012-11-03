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
		usuarioModel.save(function(e) {
			if(e) res.send(e);
			else res.send({
				msg: 'OK'
			});
		});
	});
}