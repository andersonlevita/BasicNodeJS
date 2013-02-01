define ["underscore"
	"backbone"
	"models/usuario/usuarioModel"
], (_, Backbone, UsuarioModel) ->
	class UsuarioCollection extends Backbone.Collection
		model: UsuarioModel
		url: "/usuarios"
		sync: (method, model, options)->
			super method, model, options
			console.log "sincroni...", method, model

		
	UsuarioCollection