define([
  'underscore',
  'backbone',
  'utils'], function(_, Backbone, Utils) {
  var UsuarioModel = Backbone.Model.extend({
    defaults: {
      nome: '',
      email: '',
      senha: '',
      confirmacaoSenha: ''
    },

    // toJSON: function(){      
    //   var attrs = Backbone.Model.prototype.toJSON.call(this);
    //   delete attrs.confirmacaoSenha;
    //   return attrs;
    // },   

    url: Utils.url + 'usuario',
  });

  return UsuarioModel;
});