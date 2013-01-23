#
# * User Model
# *
# * Instead of following the traditional Mongoose examples, I'm
# * using a function to provide both private and public methods to
# * this model to keep things more organized!
# 
Usuario = ->
  mongoose = require("mongoose")
  Schema = require("mongoose").Schema
  criptografia = require("./../seguranca/criptografia")
  setSenha = (value) ->
    salt = criptografia.gerarSalt()
    senha = criptografarSenha(value + salt)
    @set "salt", salt
    senha

  criptografarSenha = (value) ->
    criptografia.sha1 value, 1000

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

  usuarioSchema.method validarSenha: (senha) ->
    sys.puts sys.inspect(this) #Log
    salt = @get("salt")
    senhaSha = criptografarSenha(senha + salt)
    senhaSha is @get("senha")

  usuarioSchema.static findByEmail: (email, success, error) ->
    sys.puts sys.inspect(this) #Log
    @findOne
      email: email
    , (e, o) ->
      if e
        error e  if error
      else
        success o  if success

  model = mongoose.model("user", usuarioSchema)
  
  # // Creating a register method for convenience
  # var _register = function(email, password, callback) {
  #     _model.create({
  #       email: email,
  #       password: password
  #     }, function(e, doc) {
  #       if(e) {
  #         fail(e);
  #       } else {
  #         callback(doc);
  #       }
  #     });
  #   };
  # // Creating a findByEmail method for convenience
  # var _findByEmail = function(email, success, fail) {
  #     _model.findOne({
  #       email: email
  #     }, function(e, doc) {
  #       if(e) {
  #         fail(e);
  #       } else {
  #         success(doc);
  #       }
  #     });
  #   }
  #   // Returning properties and methods we'd like to be public
  
  # register: _register,
  schema: usuarioSchema
  model: model

# findByEmail: _findByEmail
Usuario()

module.exports = Usuario