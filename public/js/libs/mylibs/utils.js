define(['jquery', 'enums/tipoMensagem'], function($, TipoMsg) {

	var ret = {
		url: '/',

		post: function(data, local, success, error) {
			var that = this;

			$.ajax({
				url: that.url + local,
				type: 'POST',
				dataType: 'json',
				//contentType: 'application/json',
				//crossDomain: true,
				cache: false,
				// timeout: 5000,
				data: data,
				success: success,
				error: error,
			});
		},

		mostraMensagem: function(mensagem, tipo) {
			// if(tipo == TipoMsg.erro){}
			alert(mensagem);
		},

		validaModelCampos: function(model, error) {
			for(var i = 0; i < error.length; i++) {
				var field = $('input[name=' + error[i].path + ']');

				if(i == 0) field.focus();

				field.parent().parent().addClass('error');
				field.parent().append($('<span class="help-inline">' + error[i].message + '</span>'));
			};
		},
		
	};
	return ret;
});