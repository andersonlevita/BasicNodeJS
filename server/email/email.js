var settings = require('./emailSettings');
var email = {};
module.exports = email;

email.server = require("emailjs/email").server.connect({
	host: settings.host,
	user: settings.user,
	password: settings.password,
	ssl: true
});

email.send = function(emailTo, subject, emailCC, emailBCC, emailText, emailHtml, callback) {

	if(typeof emailTo == 'array') emailTo = emailTo.split(', ');
	else if(typeof emailTo != 'string') emailTo = emailTo.toString();

	email.server.send({
		from: settings.sender,
		to: emailTo,
		cc: emailCC.split(', ');
		bcc: emailBCC.split(', ');
		subject: subject,
		text: emailText,
		attachment: [data: emailHtml,
		alternative: true]
	}, callback);
}