// Generated by CoffeeScript 1.4.0
(function() {

  define(["jquery", "enums/messageType"], function($, MsgType) {
    var ret;
    ret = {
      show: function(message, type) {
        return alert(message);
      },
      validateMessages: function(model, errors) {
        var err, field, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          err = errors[_i];
          field = $("input[name=" + err.path + "]");
          field.parent().parent().addClass("error");
          _results.push(field.parent().append($("<span class=\"help-inline\">" + err.message + "</span>")));
        }
        return _results;
      }
    };
    return ret;
  });

}).call(this);
