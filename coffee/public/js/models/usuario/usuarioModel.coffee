define ["underscore"
  "backbone"
  "utils"
], (_, Backbone, Utils) ->
  class UsuarioModel extends Backbone.Model
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
    url: "/usuario"
  
  UsuarioModel