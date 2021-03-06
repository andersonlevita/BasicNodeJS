// Generated by CoffeeScript 1.4.0
(function() {
  var Db, Server, dbFactory, dbHost, dbName, dbPort;

  Db = require("mongodb").Db;

  Server = require("mongodb").Server;

  dbPort = 27017;

  dbHost = "localhost";

  dbName = "testeLogin";

  dbFactory = {};

  dbFactory.db = new Db(dbName, new Server(dbHost, dbPort, {
    auto_reconnect: true
  }, {}));

  dbFactory.db.open(function(e, d) {
    if (e) {
      return console.log(e);
    } else {
      return console.log("Conectado ao db :: " + dbName);
    }
  });

  module.exports = dbFactory.db;

}).call(this);
