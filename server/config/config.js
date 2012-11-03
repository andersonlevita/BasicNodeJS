var ambient = 'development';

module.exports = function(pAmbient) {
	var amb = {
		test: {
			host: 'localhost',
			database: 'BasicNodeTest'
		},
		development: {
			host: 'localhost',
			database: 'BasicNodeDev'
		},
		production: {
			host: 'localhost',
			database: 'BasicNodeJS'
		}
	}
	if(pAmbient) ambient = pAmbient;
	return amb[ambient];
};