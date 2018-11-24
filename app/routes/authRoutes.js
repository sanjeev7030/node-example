'use strict';
 var sql = require('../model/db.js');
 var Auth = require('../controller/authController');
 var path = require('path');

 module.exports = function(app) {
     
   
     
// route for user Login
    app.route('/login')
    .get(Auth.sessionChecker, (req, res) => {
        console.log('login get');
        res.sendFile(path.join(__dirname, '../public/login.html'));
    })
    .post( (req, res, next) => {
        var username = req.body.name,
            password = req.body.password;
        console.log('login Post');
        var myquery = "Select * from employees where name = '" + username + "' and password = '" + password + "'";
        console.log(myquery);

        sql.myAsyncQuery(myquery)
            .then((result) => {
                try {
                    result.forEach(x => console.log(x))
                    req.session.user = username;
                    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
                }
                catch (err) {
                    console.log("User and password does not match");
                    res.send({"code": 204, "success": "User and password does not match"});
                };
            }); 

    });
    
// route for user signup
    app.route('/signup')
        .get(Auth.sessionChecker, (req, res) => {
             res.sendFile(path.join(__dirname, '../public/signup.html'));
        })
        .post((req, res) => {
            var username = req.body.name,
                password = req.body.password,
                location = req.body.location;
            console.log('Signup Post');
            var myquery = "INSERT INTO employees (name, location, password) values ( '" + username + "' , '" + location + "' ,'" + password +"' ) ";
            console.log(myquery) ;  


            sql.myAsyncQuery(myquery)
                .then((result) => {
                    try {

                        req.session.user = username;
                        res.redirect('/tasks/' + result.insertId);
                    }
                    catch (err) {
                        console.log("Please input correct values");
                        console.log("error: ", err);
                    };
                }); 

        });
    
//route for Dashboard
app.route('/dashboard')
    .get(Auth.sessionChecker, (req, res) => {
        console.log('login dashboard');
        res.sendFile(path.join(__dirname, '../public/dashboard.html'));
    })     
 
    
// route for user logout
    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/login');
        } else {
            res.redirect('/login');
        }
    });

  };