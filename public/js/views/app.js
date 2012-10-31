define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/layout.html'
], function($, _, Backbone, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.container',

    render: function () {
      var that = this;
      
      $(this.el).html(layoutTemplate);
    }
  });

  return AppView;
});
