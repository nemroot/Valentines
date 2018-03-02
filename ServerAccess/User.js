var rp      = require('request-promise');
var config   = require('../configuration/config');



function saveOrUpdate(user){
    var options = {
        method: 'POST',
        uri: config.da.host+'user',
        body: user,
        json: true 
    };

    return rp.post(options);
}

module.exports.saveOrUpdate = saveOrUpdate;

function getUser(id, profileType){   
   return rp.get({url : config.da.host + 'user?id=' + id + '&profileType=' + profileType, json : true});
}

module.exports.getUser = getUser;