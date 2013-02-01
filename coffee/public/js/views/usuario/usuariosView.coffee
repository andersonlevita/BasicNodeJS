define ["jquery"
	"underscore"
	"backbone"
	"text!templates/usuario/lista.html"
	"models/usuario/usuarioCollection"
], ($, _, Backbone, Template, UsuarioCollection) ->
	class UsuariosView extends Backbone.View
		el: ".page"
		collection: new UsuarioCollection
		template: _.template Template
		
		initialize: ->			
			@collection.fetch
				success: (collection, response) =>
					@collection.update response					
					@render()

			@collection.on "remove", ()=>
				@render()

		render: ->
			@$el.html @template usuarios : @collection.models

			that = @
			$(".btn-delete").click ()->
				if $(@).data("id")					
					that.collection.remove $(@).data("id")

	UsuariosView