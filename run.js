exec = require('child_process').exec
//settings = require('./settings');

exec('node main.js', function(error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
});

exec('coffee -wo ./ -c coffee/', function(error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
});