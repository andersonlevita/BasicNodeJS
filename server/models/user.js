// Generated by CoffeeScript 1.4.0
(function() {
  var Usuario;

  Usuario = function() {
    var Schema, criptografarSenha, criptografia, model, mongoose, setSenha, usuarioSchema;
    mongoose = require("mongoose");
    Schema = require("mongoose").Schema;
    criptografia = require("./../seguranca/criptografia");
    setSenha = function(value) {
      var salt, senha;
      salt = criptografia.gerarSalt();
      senha = criptografarSenha(value + salt);
      this.set("salt", salt);
      return senha;
    };
    criptografarSenha = function(value) {
      return criptografia.sha1(value, 1000);
    };
    usuarioSchema = new Schema({
      nome: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        index: {
          unique: true,
          sparse: true
        }
      },
      senha: {
        type: String,
        required: true,
        set: setSenha
      },
      salt: {
        type: String,
        required: true
      }
    });
    usuarioSchema.method({
      validarSenha: function(senha) {
        var salt, senhaSha;
        sys.puts(sys.inspect(this));
        salt = this.get("salt");
        senhaSha = criptografarSenha(senha + salt);
        return senhaSha === this.get("senha");
      }
    });
    usuarioSchema["static"]({
      findByEmail: function(email, success, error) {
        sys.puts(sys.inspect(this));
        return this.findOne({
          email: email
        }, function(e, o) {
          if (e) {
            if (error) {
              return error(e);
            }
          } else {
            if (success) {
              return success(o);
            }
          }
        });
      }
    });
    model = mongoose.model("user", usuarioSchema);
    return {
      schema: usuarioSchema,
      model: model
    };
  };

  Usuario();

  module.exports = Usuario;

}).call(this);
