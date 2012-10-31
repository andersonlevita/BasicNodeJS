module.exports = function(app, express, dir) {
	app.configure(function() {
		app.use(express.methodOverride());
		app.use(express.bodyParser());
		app.use(express.cookieParser('CkKiiE3749S877ss0s75GDDwC&*¨%$'));
		app.use(express.session({
			secret: 'C87*889fhgwli&%554$jsHH',
			//Colocar string randomica
			// cookie: {
			// 	maxAge: 6000
			// }
		}));
		app.use(express.static(dir + '/public'));
	});
}