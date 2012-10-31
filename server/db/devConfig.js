module.exports = function(mongoose) {
	mongoose.set('debug', true);
	var db = mongoose.createConnection('localhost', 'dbTeste');

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
		assert.ok(err);
	});

	db.on('error', function(err) {
		console.log(err);
	});

	return db;
}