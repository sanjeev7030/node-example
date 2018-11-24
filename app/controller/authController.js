

    
exports.sessionChecker=(req, res, next) =>{
     console.log('Authcontroller');

  if ((req.session.user) == undefined && req.url != '/login' && req.url != '/signup') {     
            res.redirect('/login'); 
      } else {
        next();
      }    
  };
  
  