exec = require('child_process').exec
settings = require('./settings');

for(var i = settings.Projects.length - 1; i >= 0; i--) {
	upServer(settings.Projects[i].name, settings.Projects[i].port);
};

function upServer(project, port){
	var commandNode = 'cd ' + settings.Base + project + '/build && node runserver.js';
	var commandCoffee = 'cd ' + settings.Base + project + '&& coffee -w -o js/ -c coffee/';

	exec(commandCoffee, function (error, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
	});

	exec(commandNode, function(error, stdout, stderr) {	
		console.log(stdout);
		console.log(stderr);
	});
}