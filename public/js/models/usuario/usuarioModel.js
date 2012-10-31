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

    toJSON: function(){      
      var attrs = Backbone.Model.prototype.toJSON.call(this);
      delete attrs.confirmacaoSenha;
      return attrs;
    },   

    validate: function(attrs) {
      var errors = [];
      if(!attrs.nome || attrs.nome.length == 0) {
        errors.push({
          path: 'nome',
          message: 'O campo nome deve ser preenchido.'
        });
      }

      if(!attrs.email || attrs.email.length == 0) {
        errors.push({
          path: 'email',
          message: 'O campo email deve ser preenchido.'
        });
      }

      var temSenhaEConfirmacao = true;
      if(!attrs.senha || attrs.senha.length == 0) {
        errors.push({
          path: 'senha',
          message: 'O campo senha deve ser preenchido.'
        });
        temSenhaEConfirmacao = false;
      }

      if(!attrs.confirmacaoSenha || attrs.confirmacaoSenha.length == 0) {
        errors.push({
          path: 'confirmacaoSenha',
          message: 'O campo confirmação de senha deve ser preenchido.'
        });
        temSenhaEConfirmacao = false;
      }

      if(temSenhaEConfirmacao && attrs.confirmacaoSenha !== attrs.senha) {
        errors.push({
          path: 'confirmacaoSenha',
          message: 'A confirmação de senha não confere com a senha.'
        });
      }

      if(errors.length > 0) return errors;
    },

    url: Utils.url + 'usuario',
  });

  return UsuarioModel;
});