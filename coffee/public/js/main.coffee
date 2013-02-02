require.config paths:
	jquery: "libs/jquery/jquery.min"
	jStore: "libs/jquery/jquery-store"
	backbone: "libs/backbone/backbone"
	bootstrap: "libs/bootstrap/bootstrap.min"
	underscore: "libs/underscore/underscore"
	text: "libs/require/text"
	utils: "libs/mylibs/utils"
	templates: "../templates"

# window.log = ->
# 	log.history = log.history or []
# 	log.history.push arguments_
# 	console.log Array::slice.call(arguments_)  if @console

require ["views/app"
	"router"
	"vm"
], (AppView, Router, Vm) ->
	appView = Vm.create {}, "AppView", AppView
	appView.render()
	
	Router.initialize appView: appView
