define ["jquery"
	"underscore"
	"backbone"
	"text!templates/usuario/cadastro.html"
	"models/usuario/usuarioModel"
], ($, _, Backbone, Template, UsuarioModel) ->
	class UsuarioView extends Backbone.View
		el: ".page"
		store: null
		model: new UsuarioModel
		
		initialize: ->
			# this.model.on("error", Utils.validaModelCampos);
			@model.on "change", ()=>
				@render

		render: ->
			that = this
			template = _.template(Template)
			$(@el).html template()
			@model.fetchForm @options.id, ["senha"]

		events:
			"submit #frmUsuario": "submit"

		submit: (event) ->
			@model.saveForm()
			event.preventDefault()

	UsuarioView
