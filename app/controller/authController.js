
 var config = require('../config'); // get config file
 var jwt = require('jsonwebtoken');
    
exports.sessionChecker=(req, res, next) =>{
     console.log('Authcontroller');

  if ((req.session.user) == undefined && req.url != '/login' && req.url != '/signup') {     
            res.redirect('/login'); 
      } else {
        next();
      }    
  };

exports.jwtTokenChecker =async (req, res) => {
  console.log('Authjwtcontroller');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
 console.log('Checking token=>>' + token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    try{
       username = await jwt.verify(token,config.secret); 
      console.log(username);
      return token;
    }
    catch(e){
       return res.json({ success: false, message: 'Failed to authenticate token.' });
    }
   

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};

exports.jwtTokenCGenerator = async (user) => {
  console.log('AuthjwtGenerator');
      // if user is found and password is right
      // create a token with only our given payload
  var payload = { username : user };
      var token = await jwt.sign(payload, config.secret, { expiresIn: '1h' });

      console.log("Token - " + token);
      // return the information including token as JSON
     return token;
};

exports.appJwtTokenChecker =async (req, res,next) => {
  console.log('Authjwtcontroller');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
 console.log('In appJwt Checking token=>>' + token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    try{
       username = await jwt.verify(token,config.secret); 
      console.log('In appJwt ' + JSON.stringify(username)); 
      next();
      return token;
    }
    catch(e){
       return res.json({ success: false, message: 'Failed to authenticate token.' });
    }
   

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};