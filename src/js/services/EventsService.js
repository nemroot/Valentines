app.service('EventsService' , EventsService);

EventsService.$inject = ['$http'];

function EventsService($http) {
    this.getEvents = function (location, endpoint ,category, currentPage, pageMaxSize) {
        console.log('http://localhost:8080/proxy/doors?endpoint='+ endpoint +'path=' + category  + '&lat='+ location.lat +'&lng='+ location.long  + '&from='+ currentPage +'&size=' + pageMaxSize);
        return $http.get('http://localhost:8080/proxy/doors?endpoint='+ endpoint +'&path=' + category  + '&lat='+ location.lat +'&lng='+ location.long  + '&from='+ currentPage +'&size=' + pageMaxSize);
    };

}