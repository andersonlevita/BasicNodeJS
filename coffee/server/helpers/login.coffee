sys = require "sys"
resHelper = require "./response"
crypt = require "./cryptography"

module.exports =
	logged: (req, res, next) ->

		# console.log sys.puts sys.inspect req

		# console.log "Usuario: #{req.session.user}"
		# console.log "SessionToken: #{req.session.user.token if req.session.user}"
		# console.log "GeneratedToken: #{crypt.sessionTokenGenerate(req)}"

		if req.session.user and crypt.sessionTokenGenerate(req) is req.session.user.token
			next()
		else
			resHelper.authenticationError res
