define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/login/sucesso.html'
	], function($, _, Backbone, TplSucesso) {
	var sucesso = Backbone.View.extend({
		el: '.page',

		render: function() {
			var template = _.template(TplSucesso);
			$(this.el).html(template());
		}
	});
	return sucesso;
});