
var GoogleStrategy     = require( 'passport-google-oauth2' ).Strategy;
var FacebookStrategy   = require('passport-facebook').Strategy;
var config             = require('../configuration/config');
var userApi            = require('../ServerAccess/User');
   



module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
           cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

    
    passport.use(new FacebookStrategy({
        clientID     : config.facebook.appId,
        clientSecret : config.facebook.appSecret,
        callbackURL  : config.facebook.callbackUrl,
        profileFields: ['id', 'emails', 'name', 'photos']
    },
    function(accessToken, refreshToken, profile, cb) {

       process.nextTick(function() {
            if(profile){
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
           
                var data                    = {
                    'facebook' : {
                        'id'              : profile.id,
                        'email'           : profile.emails[0].value,
                        'profilePicture'  : (profile.photos && profile.photos[0] ?  profile.photos[0].value : null),
                        'displayName'     : profile.displayName,
                        'firstName'       : profile.name.givenName,
                        'lastName'        : profile.name.familyName,
                        'access_token'    : accessToken,
                        'gender'          : profile.gender

                    },
                    'registeredAs'  : 'facebook'
                 };
                
                 userApi.saveOrUpdate(data)
                            .then(function(saveUserResult){
                                console.log('facebook saved user result', saveUserResult);
                          }).catch(function(saveUserErr){
                                console.log('saveUserErr', saveUserErr);
                        });
            }
              
            return cb(null, profile);
       });
    }));


     passport.use(new GoogleStrategy({
        clientID     : config.google.appId,
        clientSecret : config.google.appSecret,
        callbackURL  : config.google.callbackUrl
    },
    function(accessToken, refreshToken, profile, cb) {
       
       process.nextTick(function() {
            if(profile){
                profile.accessToken         = accessToken;
                profile.refreshToken        = refreshToken;
                var data                    = {
                    'google' : {
                        'id'              : profile.id,
                        'email'           : profile.emails[0].value,
                        'profilePicture'          : profile.photos[0].value,
                        'displayName'     : profile.displayName,
                        'firstName'       : profile.name.givenName,
                        'lastName'        : profile.name.familyName,
                        'access_token'    : accessToken,
                        'gender'          : profile.gender

                    },
                    'registeredAs'  : 'google'
                 };
              
                 userApi.saveOrUpdate(data)
                        .then(function(saveUserResult){
                                console.log('google saved user result' ,saveUserResult);
                            }
                        ).catch(function(saveUserErr){
                                console.log('saveUserErr',saveUserErr);
                        });

            }
            return cb(null, profile);
       });
    }));

}