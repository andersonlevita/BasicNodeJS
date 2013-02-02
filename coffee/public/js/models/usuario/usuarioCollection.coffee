define ["underscore"
	"backbone"
	"models/usuario/usuarioModel"
], (_, Backbone, UsuarioModel) ->
	class UsuarioCollection extends Backbone.Collection
		model: UsuarioModel
		url: "/usuarios"
		modelsChanged: []

		initialize: ->
			@bind "remove", (model) =>
				@modelsChanged.push
					method: "remove"
					model: model
			@bind "add", (model) =>
				@modelsChanged.push
					method: "add"
					model: model

		save: ->
			for changed in @modelsChanged
				changed.model.destroy() if changed.method is "remove"
				changed.model.save() if changed.method is "add"

	UsuarioCollection