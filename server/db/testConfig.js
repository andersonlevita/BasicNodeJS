module.exports = {
	host: 'localhost',
	database: 'dbUnitTest',

	binds: function(db) {
		db.on('connected', function() {
			console.log('DB conectado a ' + db.name + ' em ' + db.host + ':' + db.port);
		});

		db.on('open', function() {
			console.log('Conexao com DB aberta.');
		});

		db.on('disconneected', function() {
			console.log('DB Disconectado.');
		});

		db.on('close', function() {
			console.log('Conexao com DB fechada.');
		});

		db.on('error', function(err) {
			console.log('Erro na conexao com DB.');
			console.log(err);
		});
	}
};