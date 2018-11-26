'use strict';
 var sql = require('../model/db.js');
 var Auth = require('../controller/authController');
 var path = require('path');

 module.exports = function(app) {
     
   
     
// route for user Login
    app.route('/login')
    .get((req, res) => {
        console.log('login get');
        res.sendFile(path.join(__dirname, '../public/login.html'));
    })
    .post((req, res) => {
        var username = req.body.name,
            password = req.body.password;
        console.log('login Post');
        var myquery = "Select * from employees where name = '" + username + "' and password = '" + password + "'";
        console.log(myquery);

        sql.myAsyncQuery(myquery)
            .then(async (result) => {
                try {
                    result.forEach(x => console.log(x))
                    var token = await Auth.jwtTokenCGenerator(username);
                    //res.set('token',token);
                    console.log('login token =>'+ token)
                    res.redirect('/dashboard'+ '/?token=' + token);
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
        .post( (req, res) => {
            var username = req.body.name,
                password = req.body.password,
                location = req.body.location;
            console.log('Signup Post');
            var myquery = "INSERT INTO employees (name, location, password) values ( '" + username + "' , '" + location + "' ,'" + password +"' ) ";
            console.log(myquery) ;  


            sql.myAsyncQuery(myquery)
                .then(async (result) => {
                    try {

                        var token = await Auth.jwtTokenCGenerator(username);
                        console.log('Signup token =>'+ token);
                        res.redirect('/tasks/' + result.insertId + '/?token=' + token);
                    }
                    catch (err) {
                        console.log("Please input correct values");
                        console.log("error: ", err);
                    };
                }); 

        });
    
//route for Dashboard
app.route('/dashboard')
    .get(async (req, res) => {
        console.log('login dashboard');
        try{
             var token = await Auth.jwtTokenChecker(req,res);
             console.log('Checked token =>'+ token); 
        res.sendFile(path.join(__dirname, '../public/dashboard.html') ,{headers:{'x-access-token':token}}); 
        }
        catch(e){
            console.log('err login dashboard' + e);
        }
      
    })     
     
// route for user logout
    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            //res.clearCookie('user_sid');
            res.redirect('/login');
        } else {
            res.redirect('/login');
        }
    });

  };