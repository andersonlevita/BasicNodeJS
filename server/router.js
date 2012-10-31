var sys = require('sys');
var login = require('./login');

module.exports = function(app) {
	app.post('/login', login.autenticar);

	app.post('/ver', function(req, res) {
		if(login.validarRequest(req)) res.send({
			msg: 'Sessão válida'
		});
		else res.send({
			msg: 'Sessão inválida'
		});
	});

	app.post('/sessao', function(req, res){
		// sys.puts(sys.inspect(req));
		console.log(req.sessionID);
		// res.cookie('name', 'tobi', { signed: true });
		res.send({msg: 'ok'});
	})
}