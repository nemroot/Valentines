var express             = require('express');
var morgan              = require('morgan');             // log requests to the console (express4)
var bodyParser          = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride      = require('method-override'); // simulate DELETE and PUT (express4)
var session             = require('express-session');
var fileUpload          = require('express-fileupload');
var passport            = require('passport');


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(fileUpload());
app.use(session({secret: 'jepatxu consolya'}));
app.use(passport.initialize());
app.use(passport.session());
require('./configuration/auth')(passport);


app.engine('html',  require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/proxy',   require('./routes/Proxy'));
app.use('/user',    require('./routes/user'));
app.use('/login',   require('./routes/Auth')(passport));
app.use('/profile', require('./routes/Profile'));





app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening on port 3000");
