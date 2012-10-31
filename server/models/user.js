/*
 * User Model
 *
 * Instead of following the traditional Mongoose examples, I'm
 * using a function to provide both private and public methods to
 * this model to keep things more organized!
 */

var Usuario = function() {
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;
    var criptografia = require('./../seguranca/criptografia');

    var setSenha = function(value) {
        var salt = criptografia.gerarSalt();
        var senha = criptografarSenha(value + salt);

        this.set('salt', salt);
        return senha;
      }

    var criptografarSenha = function(value) {
        return criptografia.sha1(value, 1000);
      }

    var usuarioSchema = new Schema({
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

        sys.puts(sys.inspect(this)); //Log
        var salt = this.get('salt');
        var senhaSha = criptografarSenha(senha + salt);
        return senhaSha == this.get('senha');
      },
    });

    usuarioSchema.static({
      findByEmail: function(email, success, error) {

        sys.puts(sys.inspect(this)); //Log
        this.findOne({
          email: email
        }, function(e, o) {
          if(e) {
            if(error) error(e);
          } else {
            if(success) success(o);
          }
        });
      },
    });
    
    var model = mongoose.model('user', usuarioSchema);

    // // Creating a register method for convenience
    // var _register = function(email, password, callback) {
    //     _model.create({
    //       email: email,
    //       password: password
    //     }, function(e, doc) {
    //       if(e) {
    //         fail(e);
    //       } else {
    //         callback(doc);
    //       }
    //     });
    //   };
    // // Creating a findByEmail method for convenience
    // var _findByEmail = function(email, success, fail) {
    //     _model.findOne({
    //       email: email
    //     }, function(e, doc) {
    //       if(e) {
    //         fail(e);
    //       } else {
    //         success(doc);
    //       }
    //     });
    //   }
    //   // Returning properties and methods we'd like to be public
    
    return {
      // register: _register,
      schema: usuarioSchema,
      model: model,
      // findByEmail: _findByEmail
    }
  }();

module.exports = Usuario;