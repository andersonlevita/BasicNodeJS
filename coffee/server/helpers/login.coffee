crypt = require "./cryptography"

module.exports =
	requestValidate: (req) ->
		return false  unless req.session.user
		return crypt.sessionTokenGenerate(req) is req.session.user.token