require.config({
  paths: {
    jquery: 'libs/jquery/jquery.min',
    jStore: 'libs/jquery/jquery-store',
    backbone: 'libs/backbone/backbone',
    bootstrap: 'libs/bootstrap/bootstrap.min',
    underscore: 'libs/underscore/underscore',
    text: 'libs/require/text',
    utils: 'libs/mylibs/utils',
    templates: '../templates'
  }
});

window.log = function() {
  log.history = log.history || [];
  log.history.push(arguments);
  if(this.console) {
    console.log(Array.prototype.slice.call(arguments))
  }
};

require(['views/app', 'router', 'vm'], function(AppView, Router, Vm) {
  var appView = Vm.create({}, 'AppView', AppView);
  appView.render();
  Router.initialize({appView: appView});
});