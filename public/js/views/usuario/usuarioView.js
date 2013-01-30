// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "text!templates/usuario/cadastro.html", "utils", "models/usuario/usuarioModel", "enums/tipoMensagem"], function($, _, Backbone, Template, Utils, UsuarioModel, TipoMsg) {
    var Login;
    Login = (function(_super) {

      __extends(Login, _super);

      function Login() {
        return Login.__super__.constructor.apply(this, arguments);
      }

      Login.prototype.el = ".page";

      Login.prototype.store = null;

      Login.prototype.model = new UsuarioModel;

      Login.prototype.initialize = function() {
        var _this = this;
        return this.model.on("change", function() {
          console.log("changed");
          return _this.render;
        });
      };

      Login.prototype.render = function() {
        var template, that;
        that = this;
        template = _.template(Template);
        $(this.el).html(template());
        return this.fill();
      };

      Login.prototype.fill = function() {
        if (!this.options.id) {
          return;
        }
        this.model.set("id", this.options.id);
        this.model.fetch();
        return _.each(this.model.attributes, function(value, key) {
          return $("input[name=" + key + "]").val(value);
        });
      };

      Login.prototype.events = {
        "submit #frmUsuario": "submit"
      };

      Login.prototype.submit = function(event) {
        var that;
        that = this;
        $(".error").removeClass("error");
        $(".help-inline").detach();
        this.model.set({
          nome: $("input[name=nome]").val(),
          email: $("input[name=email]").val(),
          senha: $("input[name=senha]").val(),
          confirmacaoSenha: $("input[name=confirmacaoSenha]").val()
        });
        event.preventDefault();
        return;
        this.model.save(undefined, {
          wait: true,
          success: function(model, response) {
            return console.log("sucesso", model, response);
          },
          error: function(model, error) {
            return console.log("erro", model, error);
          }
        });
        return event.preventDefault();
      };

      return Login;

    })(Backbone.View);
    return Login;
  });

}).call(this);
