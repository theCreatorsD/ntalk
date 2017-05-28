// set up
// get all the tools
var express = require('express')
var app = express()
var port = process.env.PORT || 80
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var configDB = require('./config/database.js')

// configuration
mongoose.connect(configDB.url);

// pass passport for configuration
require('./config/passport')(passport)

app.use(express.static('public'))

// set up express application
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'ejs')

// required for passport
app.use(session({ secret: 'Helloworl:D' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// routes
// load routes and pass in an app and fully configured passport
require('./app/routes.js')(app, passport, mongoose)

// launch
app.listen(port, function() {
  console.log('Listening on port ' + port)
})
