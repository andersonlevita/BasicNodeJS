module.exports = (mongoose) ->
  mongoose.set "debug", true
  db = mongoose.createConnection("localhost", "dbTeste")
  
  db.on "connected", ->
    console.log "DB conectado a " + db.name + " em " + db.host + ":" + db.port

  db.on "open", ->
    console.log "Conexao com DB aberta."

  db.on "disconneected", ->
    console.log "DB Disconectado."

  db.on "close", ->
    console.log "Conexao com DB fechada."

  db.on "error", (err) ->
    console.log "Erro na conexao com DB."
    assert.ok err

  db.on "error", (err) ->
    console.log err

  db