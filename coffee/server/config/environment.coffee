environment = "development"

module.exports = (pEnvironment) ->
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

	environment = pEnvironment  if pEnvironment
	amb[environment]