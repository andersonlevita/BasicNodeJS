sys = require "sys"
login = require "./login/login"

module.exports = (app) ->
	app.post "/login", login.login

	app.post "/logout", (req, res) ->
		login.logout req, res

	app.post "/ver", (req, res) ->
		if login.requestValidate req
			res.send msg: "Sessão válida"
		else
			res.send msg: "Sessão inválida"

	app.post "/sessao", (req, res) ->		
		# sys.puts(sys.inspect(req));
		console.log req.sessionID		
		# res.cookie('name', 'tobi', { signed: true });
		res.send msg: "ok"