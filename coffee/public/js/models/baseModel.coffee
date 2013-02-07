define ["underscore"
	"backbone"
	"jquery"
	"messageHelper"
	"enums/messageType"
], (_, Backbone, $, MsgHelper, MsgType) ->
	class BaseModel extends Backbone.Model
		idAttribute: "_id"
		
		# fetchForm: (id, exceptions) ->			
		# 	return unless id
		# 	@set "_id", id
		# 	@fetch
		# 		success: (model) =>
		# 			for key, value of model.attributes
		# 				continue if exceptions and key in exceptions
		# 				$("input[name=#{key}]").val value

		# saveForm: ->
		# 	$(".error").removeClass "error"
		# 	$(".help-inline").detach()

		# 	newModel = {}

		# 	for attr of @attributes
		# 		newModel[attr] = $("input[name=#{attr}]").val() if $("input[name=#{attr}]").length

		# 	return unless Object.keys(newModel).length

		# 	@set newModel

		# 	@save `undefined`,
		# 		wait: true
		# 		success: (model, response) ->
		# 			console.log "sucesso save", model, response
		# 			MsgHelper.show "Usuário registrado com sucesso.", MsgType.sucesso

		# 		error: (model, error) ->
		# 			console.log "erro", model, JSON.parse error.responseText					
		# 			return unless error.responseText					
		# 			err = JSON.parse error.responseText
		# 			if err.errors
		# 				errors = _.map err.errors, (val, prop) ->
		# 					val						
		# 				MsgHelper.validateMessages model, errors
		# 			else if err.err
		# 				MsgHelper.show err.err, MsgType.erro

					# MsgHelper.mostraMensagem "Erro de conexão com o servidor.", MsgType.erro  if error.statusText and error.statusText is "error"

			
			# that.model.clear({
			# 	silent: true
			# });
	
	BaseModel