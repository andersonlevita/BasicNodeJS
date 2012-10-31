define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/login/login.html',
	'jStore',
	'utils',
	'enums/tipoMensagem'
	], function($, _, Backbone, TplLogin, jStore, Utils, TipoMsg) {
	var Login = Backbone.View.extend({
		el: '.page',

		store: null,

		initialize: function() {
			this.store = jStore.store();
		},

		render: function() {
			var template = _.template(TplLogin);
			var that = this;
			$(this.el).html(template());

			// $(this.el).find('#frmLogin').submit(function(){
			// 	if(!that.validarCampos())	
			// 		window.location.hash = '#/sucesso';
			// 	return false;
			// });
		},

		events: {
			'submit #frmLogin': 'autenticar',
			'click #btnVer': 'verificarAutenticado',
			'click #btnCadastrar': 'cadastrar'
		},

		testeSessao: function(event){
			$.ajax({
				url: '/sessao',
				type: 'POST',
				dataType: 'json',
				//contentType: 'application/json',
				//crossDomain: true,
				cache: false,
				// timeout: 5000,
				data: {data: 'teste'},
				success: function(data, status, request){
					alert(data.msg);
				},
				error: function(){
					alert('erro');
				},
			});
		},

		autenticar: function(event) {
			var that = this;

			var login = {
				email: $('#inputEmail').val(),
				senha: $('#inputPassword').val()
			};

			Utils.post(login, 'login', function(data, status, request) {
				if(data.err) {
					Utils.mostraMensagem(data.err, TipoMsg.erro);
				} else {
					alert('Autenticado');
				}
			}, function(request, status, error) {
				if(status && status == 'error') {
					Utils.mostraMensagem('Erro de conexão com o servidor.', TipoMsg.erro);
				}
			});

			event.preventDefault();
			event.stopPropagation();
		},

		getLocalStorage: function() {
			try {
				return this.store.get('dat');
			} catch(e) {
				console.log('Erro ao tentar obter a sessão.');
			}
			return null;
		},

		clearLocalStorage: function() {
			this.store.remove('dat');
		},

		cadastrar: function(){
			window.location.hash = '#/usuario';
		},

		verificarAutenticado: function(event) {
			var that = this;

			Utils.post({
				teste: 'qualquer coisa'
			}, 'ver', function(data, status, request) {
				console.log(data.msg);
			}, function(request, status, error) {
				console.log('erro');
			});
		},

		validarCampos: function() {
			var erro;
			$(this.el).find('input').each(function(index) {

				$(this).parent().find('.help-inline').detach();

				if($(this).val() == '') {
					$(this).parent().parent().addClass('error');
					$(this).parent().append('<span class="help-inline">Campo requerido</span>');

					erro = true;
				} else {
					$(this).parent().parent().removeClass('error');
				}
			});

			return erro;
		}

	});
	return Login;
});