//modules
var express 		= require('express'),
	app				= express(),
	bodyParser		= require('body-parser'),
	methodOverride 	= require('method-override')

//config files
var db = require('./config/db')

//sets port
var port = process.env.PORT || 8080

//connect to mongo database
//mongoose.connect(db.url)

//parse application/json 
app.use(bodyParser.json())

//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}))

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'))

//sets location for static files
app.use(express.static(__dirname + '/public'))

//routes
require('./app/routes')(app)

//start server
app.listen(port)
console.log('Magic happens on port', port)

//expose app
exports = module.exports = app