settings = require("./emailSettings")
email = {}
module.exports = email

email.server = require("emailjs/email").server.connect
	host: settings.host
	user: settings.user
	password: settings.password
	ssl: true

email.send = (emailTo, subject, emailCC, emailBCC, emailText, emailHtml, callback) ->
	if typeof emailTo is "array"
		emailTo = emailTo.split(", ")
	else emailTo = emailTo.toString()  unless typeof emailTo is "string"
	email.server.send
		from: settings.sender
		to: emailTo
		cc: emailCC.split(", ")
		bcc: emailBCC.split(", ")
		subject: subject
		text: emailText
		attachment:
			data: emailHtml
			alternative: true
	, callback