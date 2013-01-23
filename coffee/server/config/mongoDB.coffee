Db = require("mongodb").Db
Server = require("mongodb").Server
dbPort = 27017
dbHost = "localhost"
dbName = "testeLogin"
dbFactory = {}
dbFactory.db = new Db(dbName, new Server(dbHost, dbPort,
  auto_reconnect: true
, {}))
dbFactory.db.open (e, d) ->
  if e
    console.log e
  else
    console.log "Conectado ao db :: " + dbName

module.exports = dbFactory.db