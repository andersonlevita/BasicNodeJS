var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbPort = 27017;
var dbHost = 'localhost';
var dbName = 'testeLogin';

var dbFactory = {};

dbFactory.db = new Db(dbName, new Server(dbHost, dbPort, {
	auto_reconnect: true
}, {}));

dbFactory.db.open(function(e, d) {
	if(e) {
		console.log(e);
	} else {
		console.log('Conectado ao db :: ' + dbName);
	}
});

module.exports = dbFactory.db;



