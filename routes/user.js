var express     = require('express');
var router      = express.Router();
var fs          = require('fs');
var queryString = require('query-string');
var rp          = require('request-promise');
var config      = require('../configuration/config')
var userApi     = require('../ServerAccess/User');



router.post('/pictureUpload', function(req, res) {
    req.session.profilePicture = req.files.profilePicture;
    req.session.save();
    res.json({'status':200});  
});

router.post('/checkUser', function(req,res){
    var user = req.body;

    var options = {
        method : 'POST',
        uri: config.da.host+'user/checkUser',
        body: user,
        json: true
    }

    rp.post(options)
        .then(function(responseData) {
            req.session.user = responseData;
            res.json(responseData);
        }).catch(function(err){
         res.json({'status' : '500', 'errorMessage' : 'Error while registering user'});
        });
    
});

router.post('/', function(req, res) {
    var user = {'da' : req.body};
    if(user.da && user.da.email && user.da.password && user.da.firstName && user.da.lastName){
         userApi.saveOrUpdate(user)
           .then(function(responseData) { 
                console.log(responseData);
                if(responseData.status == 200){
                    req.session.user = responseData.user;
                }
                res.json({'status':responseData.status});  
         }).catch(function(err){
                res.json({'status' : '500', 'errorMessage' : 'Error while registering user'});
         });

    }else {
        res.json({'status' : '400','errorMessage' : 'Missing user information'});
        
    }   
   
});


router.get('/testupload', function(req, res) {
  if(req.query.clean){
      req.session.destroy();
  }
  res.send('avoe'+req.query.clean);
 
});

router.get('/byPath', function(req, response, next) {
     var filePath = req.query.path;
     
     if(!filePath){
        response.writeHead(400);
        response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
        response.end(); 
     }

     fs.readFile(filePath, function(error, content) {
        var lastPoint = filePath.lastIndexOf('.');
        var contentType = "image/" + filePath.substring(lastPoint+1);
        if(error){
            response.writeHead(500);
            response.end(); 
            
         }
         else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

});

module.exports = router;