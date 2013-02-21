module.exports = (app) ->	
	app.post "/sessao", (req, res) ->		
		console.log req.sessionID		
		# res.cookie('name', 'tobi', { signed: true });
		res.send msg: "ok"