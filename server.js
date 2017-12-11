var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var passport = require('passport');
var flash = require('connect-flash');
var exphbs = require("express-handlebars");
var morgan = require('morgan');
var path = require('path');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

//logs every request to console yo
app.use(morgan('dev'));
// set up express / middleware
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//setting up templating system
app.use(express.static(path.join(__dirname, '/public')));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars'); // set up hbs for templating

// required for passport
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
} )); // session secret

//initializing passport session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Checkout the action on port: ' + port);