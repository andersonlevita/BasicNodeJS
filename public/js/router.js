define(['backbone', 'vm'], function(Backbone, Vm) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'sucesso': 'sucesso',
			'usuario': 'usuario',
			'*actions': 'defaultAction'
		}
	});

	var initialize = function(options) {
			var appView = options.appView;
			var router = new AppRouter(options);

			router.on('route:sucesso', function() {
				require(['views/login/sucesso'], function(ViewPage) {
					var viewPage = Vm.create(appView, 'SucessoView', ViewPage);
					viewPage.render();
				});
			});

			router.on('route:usuario', function() {
				require(['views/usuario/usuarioView'], function(ViewPage) {
					var viewPage = Vm.create(appView, 'CadastroUsuarioView', ViewPage);
					viewPage.render();
				});
			});

			router.on('route:defaultAction', function() {
				require(['views/login/loginView'], function(ViewPage) {
					var viewPage = Vm.create(appView, 'LoginView', ViewPage);
					viewPage.render();
				});
			});

			Backbone.history.start();
		};

	return {
		initialize: initialize
	};

});