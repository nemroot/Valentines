var express = require('express');
var router  = express.Router();



 router.get('/', require('connect-ensure-login').ensureLoggedIn(),
      function(req, res){
            res.render('profile', { user: req.user });
  }); 


router.get('/me', function(req, res) {  
     var login = {};
    if(req.session && req.session.passport && req.session.passport.user){
         login.logedin = "true";
         login.user = req.session.passport.user;
         res.status(200).json(login);
    }else{
        login.logedin = "false";
        res.status(403).json({login});
    }  
   
  });

router.get('/logout', function(req, res) {  
     req.session.destroy();
     res.redirect('/');
  });



module.exports = router;
  