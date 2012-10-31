var crypto = require('crypto');
var sys = require('sys');

var algorithmCipher = 'aes256'; // or any other algorithm supported by OpenSSL
var keyCipher = 'gGHF45$%fgfsdD&*l13kj13@#s859df__jh5k';

module.exports = {
	sha1: function(str, iteracoes) {
		if(typeof str != 'string') str = str.toString();
		if(typeof iteracoes == 'undefined') iteracoes = 0;

		var shaUm = crypto.createHash('sha1').update(str).digest('HEX');

		for(var i = 0; i < iteracoes; i++) {
			shaUm = crypto.createHash('sha1').update(shaUm).digest('HEX');
		};

		return shaUm;
	},

	gerarSalt: function() {
		var salt = this.sha1(new Date(), 10);
		return salt;
	},

	gerarSessionToken: function(req) {
		var ip_address = null;
		try {
			ip_address = req.headers['x-real-ip']; //x-forwarded-for
		} catch(error) {
			ip_address = req.connection.remoteAddress;
		}
		// sys.puts(ip_address);
		// sys.puts(sys.inspect(req.headers));

		//Verificar melhores credenciais.
		var keys = [req.headers.origin, req.headers["user-agent"], req.headers.referer];
		var ret = '';
		for(var i = 0; i < keys.length; i++) {
			ret += keys[i];
		};

		return this.sha1(ret);
	},

	cifrar: function(str) {
		var cipher = crypto.createCipher(algorithmCipher, keyCipher);
		return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
	},

	decifrar: function(cript) {
		var decipher = crypto.createDecipher(algorithmCipher, keyCipher);
		return decipher.update(cript, 'hex', 'utf8') + decipher.final('utf8');
	}
}