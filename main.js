var mongoose = require('mongoose');
var config = require('./server/config/config')();
var express = require('express');
var app = express();

require('./server/config')(app, express, __dirname);
require('./server/router')(app);
require('./server/usuario/router')(app);

mongoose.connect(config.host, config.database);

app.get('/', function(req, res) {
	res.redirect('/index.html')
});

app.listen(3000);
console.log("Rodando na porta 3000");