sys = require("sys")

module.exports =
	sendError: (response, error) ->
		response.send 412, error

	defaultResponse: (response, error, object) ->
		if error then response.send 412, error
		else response.send object