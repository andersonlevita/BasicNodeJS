define ["jquery"
	"underscore"
	"backbone"
	"text!templates/usuario/cadastro.html"
	"utils"
	"models/usuario/usuarioModel"
	"enums/tipoMensagem"
], ($, _, Backbone, Template, Utils, UsuarioModel, TipoMsg) ->
	class Login extends Backbone.View
		el: ".page"
		store: null
		model: new UsuarioModel
		
		initialize: ->
			# this.model.on("error", Utils.validaModelCampos);
			@model.on "change", ()=>
				console.log "changed"
				@render

		render: ->
			that = this
			template = _.template(Template)
			$(@el).html template()

			@fill()

		fill: ()->
			return unless @options.id
			@model.set "id", @options.id
			@model.fetch()

			_.each @model.attributes, (value, key)->
				$("input[name=#{key}]").val value

		events:
			"submit #frmUsuario": "submit"

		submit: (event) ->
			that = this
			$(".error").removeClass "error"
			$(".help-inline").detach()

			@model.set
				nome: $("input[name=nome]").val()
				email: $("input[name=email]").val()
				senha: $("input[name=senha]").val()
				confirmacaoSenha: $("input[name=confirmacaoSenha]").val()

			event.preventDefault()
			return

			@model.save `undefined`,
				wait: true
				success: (model, response) ->
					console.log "sucesso", model, response
					# if response.errors
					# 	errors = _.map(response.errors, (val, prop) ->
					# 		val
					# 	)
					# 	Utils.validaModelCampos model, errors
					# else if response.err
					# 	Utils.mostraMensagem response.err, TipoMsg.erro
					# else
					# 	Utils.mostraMensagem "Usuário registrado com sucesso.", TipoMsg.sucesso

				error: (model, error) ->
					console.log "erro", model, error
					# Utils.mostraMensagem "Erro de conexão com o servidor.", TipoMsg.erro  if error.statusText and error.statusText is "error"

			
			# that.model.clear({
			# 	silent: true
			# });
			event.preventDefault()
			# event.stopPropagation()

	Login
