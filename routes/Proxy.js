var express     = require('express');
var router      = express.Router();
var queryString = require('query-string');
var rp          = require('request-promise');
var config      = require('../configuration/config');


router.get('/events', function(req, res, next) {
    var params = queryString.stringify(req.query);
    var callType = req.query.callType;
    var url = config.da.host + callType + "?" + params;
   
    rp.get(url).then(function(responseData) {
         var result = JSON.parse(responseData);
         res.json({results : result});
    });

});

router.get('/doors', function(req, res, next) {
    var params = queryString.stringify(req.query);
    var servicePath = req.query.path;
    params = !params ? "&dummy=1" : "&"+params;
    var url = req.query.endpoint + servicePath  + params;
   
    rp.get(url).then(function(responseData) {
         res.json(JSON.parse(responseData));
    });

});

router.post('/doors', function(req, res, next) {
    var servicePath = req.query.path;
    var url = req.query.endpoint + servicePath;
    var options = {
        method: 'POST',
        uri: url,
        body: req.query,
        json: true // Automatically stringifies the body to JSON 
    };

    rp.post(options)
      .then(function(responseData) { 
         res.json(responseData);
    }).catch(function(err){
         res.json(err);
    });

});

router.post('/review', function(req, res, next) {
    var params = queryString.stringify(req.body);
    var url = config.da.host + "review?" + params;
    rp.post(url).then(function(responseData) {
         var result = JSON.parse(responseData);
         res.json(result);
    });

});

router.get('/review', function(req, res, next) {
    var params = queryString.stringify(req.query);
    var callType = req.query.callType;
    var url = config.da.host + "review?" + params;
  
    rp.get(url).then(function(responseData) {
         var result = JSON.parse(responseData);
         res.json(result);
    });

});

router.get('/place', function(req, res, next) {
    var params = queryString.stringify(req.query);
    var callType = req.query.callType;
    var url = config.da.host + "place?" + params;
    
    rp.get(url).then(function(responseData) {
         var result = JSON.parse(responseData);
         res.json(result.hits.hits[0]._source);
    });

});

router.post('/saveToList', function(req, res, next) {
    var params = queryString.stringify(req.query);
    var url = config.da.host + "saveToList?" + params;
    rp.post(url).then(function(responseData) {
         var result = JSON.parse(responseData);
         res.json(result);
    });

});

router.get('/saveToList', function(req, res, next) {
    var params = queryString.stringify(req.query);
    var callType = req.query.callType;
    var url = config.da.host + "saveToList?" + params;
  
    rp.get(url).then(function(responseData) {
         var result = JSON.parse(responseData);
         res.json(result);
    });

});

module.exports = router;
