Usuario = (()->
  mongoose = require("mongoose")
  Schema = require("mongoose").Schema
  crypt = require("./../seguranca/criptografia")

  setSenha = (value) ->
    return null  unless value
    salt = crypt.gerarSalt()
    senha = cryptPass(value + salt)
    @set "salt", salt
    senha

  cryptPass = (value) ->
    crypt.sha1 value, 1000

  usuarioSchema = new Schema
    nome:
      type: String
      required: true
    email:
      type: String
      required: true
      unique: true
      index:
        unique: true
        sparse: true
    senha:
      type: String
      required: true
      set: setSenha
    salt:
      type: String
      required: true
  
  usuarioSchema.method passValidate: (pass) ->
    salt = @get("salt")
    passSha = cryptPass(pass + salt)
    passSha is @get("senha")

  usuarioSchema.static findByEmail: (email, success, error) ->
    @findOne
      email: email
    , (e, o) ->
      if e
        error e  if error
      else
        success o  if success

  Model = mongoose.model("Usuario", usuarioSchema)
  Model
)()

module.exports = Usuario