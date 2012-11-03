define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/usuario/cadastro.html',
	'utils',
	'models/usuario/usuarioModel',
	'enums/tipoMensagem'
	], function($, _, Backbone, Template, Utils, UsuarioModel, TipoMsg) {
	var Login = Backbone.View.extend({
		el: '.page',

		store: null,

		model: new UsuarioModel,

		initialize: function() {
			var that = this;

			// this.model.on("error", Utils.validaModelCampos);
		},

		render: function() {
			var that = this;
			var template = _.template(Template);
			$(this.el).html(template());
		},

		events: {
			'submit #frmUsuario': 'submit'
		},

		submit: function(event) {
			var that = this;

			$('.error').removeClass('error');
			$('.help-inline').detach();

			this.model.set({
				nome: $('input[name=nome]').val(),
				email: $('input[name=email]').val(),
				senha: $('input[name=senha]').val(),
				confirmacaoSenha: $('input[name=confirmacaoSenha]').val()
			});

			this.model.save(undefined, {
				wait: true,
				success: function(model, response) {
					if(response.errors) {
						// var msg = response.errors.message;
						var errors = _.map(response.errors, function(val, prop) {
							return val;
						});
						Utils.validaModelCampos(model, errors);

					}else if(response.err){
						Utils.mostraMensagem(response.err, TipoMsg.erro);

					} else {
						alert('Cadastrado com sucesso!');
					}
				},
				error: function(model, error) {
					if(error.statusText && error.statusText == 'error') {
						Utils.mostraMensagem('Erro de conexão com o servidor.', TipoMsg.erro);
					}
					that.model.clear({
						silent: true
					});
				}
			});

			event.preventDefault();
			event.stopPropagation();
		},
	});
	return Login;
});