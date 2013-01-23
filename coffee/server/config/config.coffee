ambient = "development"

module.exports = (pAmbient) ->
	amb =
		test:
			host: "localhost"
			database: "BasicNodeTest"

		development:
			host: "localhost"
			database: "BasicNodeDev"

		production:
			host: "localhost"
			database: "BasicNodeJS"

	ambient = pAmbient  if pAmbient
	amb[ambient]