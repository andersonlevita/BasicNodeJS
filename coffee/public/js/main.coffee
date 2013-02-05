require.config paths:
	jquery: "libs/jquery/jquery.min"
	jStore: "libs/jquery/jquery-store"
	backbone: "libs/backbone/backbone"
	bootstrap: "libs/bootstrap/bootstrap.min"
	underscore: "libs/underscore/underscore"
	text: "libs/require/text"
	templates: "../templates"
	model: "models/baseModel"
	messageHelper: "helpers/message"
	utils: "mylibs/utils"

require ["views/app"
	"router"
	"vm"
], (AppView, Router, Vm) ->
	appView = Vm.create {}, "AppView", AppView
	appView.render()
	
	Router.initialize appView: appView
