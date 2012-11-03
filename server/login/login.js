var sys = require('sys');
var usuarioModel = require('./../usuario/usuarioModel');
var crypt = require('./../seguranca/criptografia');

module.exports = {

	makeLogin: function(req, res) {
		var email = req.body.email;
		var senha = req.body.senha

		usuarioModel.findByEmail(email, function(usuario) {
			if(!usuario) {
				res.send(500, {
					err: 'Usuário não encontrado.'
				});
			} else if(usuario.passValidate(senha)) {
				var sessaoUsuario = {
					sID: req.sessionID,
					userID: usuario.id,
					userName: usuario.nome,
					userMail: usuario.email,
					token: crypt.gerarSessionToken(req)
				}
				req.session.user = sessaoUsuario;
				res.send(200);
			} else {
				res.send(500, {
					err: 'Senha não corresponde.'
				});
			}
		}, function(erro) {
			res.send(500, {
				err: erro
			});
		});
	},

	requestValidate: function(req) {
		if(!req.session.user) return false;
		if(crypt.gerarSessionToken(req) === req.session.user.token) return true;
	}
}