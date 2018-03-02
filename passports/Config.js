
var GoogleStrategy          = require( 'passport-google-oauth2' ).Strategy;
var FacebookStrategy        = require('passport-facebook').Strategy;
var config                  = require('../configuration/config');
var serverApi               = require('../ServerAccess/UserManagement');
   



module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
           cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

    
    passport.use(new FacebookStrategy({
        clientID: config.facebookAppID,
        clientSecret: config.facebookAppSecret,
        callbackURL: config.facebookCallbackUrl
    },
    function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
       process.nextTick(function() {
            if(profile){
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
                var data = {
                    'facebook' : {
                        'id'           : profile.id,
                        'displayName'  : profile.displayName,
                        'access_token' : accessToken,
                    }
                };
                
                console.log('facebook.nextTick.profile',profile);
                console.log('##################################');
                serverApi.getUser(data.facebook.id, 'facebook').then(function(getUserResult){
                    //console.log(getUserResult);

                    if(!getUserResult || !getUserResult.found){
                        serverApi.saveUser(data)
                                 .then(function(saveUserResult){
                                        console.log('facebook saved user result', saveUserResult);
                                    }
                                ).catch(function(saveUserErr){
                                        console.log('saveUserErr', saveUserErr);
                                });
                    }
                });
                
            }
            return cb(null, profile);
       });
    }));


     passport.use(new GoogleStrategy({
        clientID: config.googleAppId,
        clientSecret: config.googleAppSecret,
        callbackURL: config.googleCallbackUrl
    },
    function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
       process.nextTick(function() {
            if(profile){
                profile.accessToken         = accessToken;
                profile.refreshToken        = refreshToken;
                var data                    = {
                    'google' : {
                        'id'              : profile.id,
                        'email'           : profile.emails[0].value,
                        'photos'          : profile.photos[0],
                        'displayName'     : profile.displayName,
                        'firstName'       : profile.name.givenName,
                        'lastName'        : profile.name.familyName,
                        'access_token'    : accessToken,
                        'gender'          : profile.gender

                    },
                    'registeredAs'  : 'google'
                };
              
                console.log('##################################', data.google.id);
                
                serverApi.getUser(data.google.id, 'google')
                         .then(function(getUserResult){
                            console.log(getUserResult);

                            if(!getUserResult || !getUserResult.found){
                                serverApi.saveUser(data)
                                        .then(function(saveUserResult){
                                                console.log('google saved user result' ,saveUserResult);
                                            }
                                        ).catch(function(saveUserErr){
                                                console.log('saveUserErr',saveUserErr);
                                        });
                            }
                        });
                
            }
            return cb(null, profile);
       });
    }));

}