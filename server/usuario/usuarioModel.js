var Usuario = function() {
		var mongoose = require('mongoose');
		var Schema = require('mongoose').Schema;
		var crypt = require('./../seguranca/criptografia');

		var setSenha = function(value) {
				var salt = crypt.gerarSalt();
				var senha = cryptPass(value + salt);

				this.set('salt', salt);
				return senha;
			}

		var cryptPass = function(value) {
				return crypt.sha1(value, 1000);
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
			passValidate: function(pass) {
				var salt = this.get('salt');
				var passSha = cryptPass(pass + salt);
				return passSha == this.get('senha');
			},
		});

		usuarioSchema.static({
			findByEmail: function(email, success, error) {
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

		var Model = mongoose.model('Usuario', usuarioSchema);
		return Model;
	}();

module.exports = Usuario;