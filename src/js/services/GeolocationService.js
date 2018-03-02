app.service('GeolocationService', function($geolocation) {
    var that = this.location;
    $geolocation.getCurrentPosition().then(function (data) {
        that = {lat:data.coords.latitude, long:data.coords.longitude};
    });

    return that;
});