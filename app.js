const express = require('express'),
  bodyParser = require('body-parser');
  var http = require('http');
  var port = (process.env.PORT || '3000');
const mysql = require('mysql');  
  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  
  
  var app = express();
  app.set('port', port);


// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});
 
// connect to database
mc.connect();


 app.listen(port);


console.log('API server started on: ' + port);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
  
  app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

var Auth = require('./app/controller/authController');
var authroutes = require('./app/routes/authRoutes'); //importing route
var fileRoutes = require('./app/routes/fsRoutes'); //importing route
var routes = require('./app/routes/appRoutes'); //importing route

  app.use(Auth.sessionChecker);  
  routes(app); //register the route
  authroutes(app); //register the authroute
  fileRoutes(app);  //register the fileroute