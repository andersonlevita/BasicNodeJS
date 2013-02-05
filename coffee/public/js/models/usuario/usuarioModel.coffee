define ["underscore"
	"backbone"
	"model"
], (_, Backbone, Model) ->
	class UsuarioModel extends Model
		defaults:
			nome: ""
			email: ""
			senha: ""
			confirmacaoSenha: ""
		urlRoot: "/usuario"
	
	UsuarioModel