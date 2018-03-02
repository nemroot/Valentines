
var express = require('express');

module.exports = function(passport) {
    var router = express.Router();

    router.get('/', function(req, res){
                res.render('login');
            });


    router.get('/facebook', passport.authenticate('facebook', { scope : ['email'] }));


    router.get('/facebook/return', 
        passport.authenticate('facebook', { failureRedirect: '/' }),
            function(req, res) {
                res.redirect('/');
    });


    router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


    router.get('/google/return', 
        passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                res.redirect('/');
    });
    
    return router;
}   