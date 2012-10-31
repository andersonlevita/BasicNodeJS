var express = require('express');
var app = express();

require('./server/config')(app, express, __dirname);
require('./server/router')(app);
require('./server/usuario/router')(app);

app.get('/', function(req, res) {
	res.redirect('/index.html')
});

app.listen(3000);
console.log("Rodando na porta 3000");