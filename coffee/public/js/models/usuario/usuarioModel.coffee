define ["underscore"
	"backbone"
], (_, Backbone) ->
	class UsuarioModel extends Backbone.Model
		idAttribute: "_id"
		defaults:
			nome: ""
			email: ""
			senha: ""
			confirmacaoSenha: ""
		
		# toJSON: function(){      
		#   var attrs = Backbone.Model.prototype.toJSON.call(this);
		#   delete attrs.confirmacaoSenha;
		#   return attrs;
		# },   
		urlRoot: "/usuario"
	
	UsuarioModel