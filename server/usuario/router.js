var UsuarioModel = require('./usuarioModel');
var sys = require('sys');
var login = require('../login');

module.exports = function(app) {
	app.post('/usuario', function(req, res) {
		var usuarioPost = req.body;
		var usuarioModel = new UsuarioModel(usuarioPost);
		usuarioModel.save(function(e) {
			if(e) res.send(500, e);
			else res.send(200);
		});

		// usuario.save(usuarioPost, function(o) {
		// 	res.send(o);
		// }, function(e) {
		// 	res.send(e);
		// });
	});
}