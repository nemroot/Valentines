app.controller('EventsController', function($rootScope , $scope, $stateParams ,$http, $geolocation , $window , EventsService, $state , $location ) {


    $scope.category = $rootScope.categoryParams;

    $rootScope.listOfEvents = [];
    $scope.pageMaxSize = 20;
    $rootScope.eventsTotalItems = 0;
    $scope.eventsCurrentPage = 0;
    $rootScope.selectedEvent;
    $scope.loadingMoreInformation = false;

    $scope.sizeCorrector = function(total,page,size) {
        var nextElements = (page + 1) * size;
        if(nextElements > total){
            return total - (page * size);
        }else {
            return size;
        }
    };

    $scope.getUserLocation = function() {
        if($rootScope.coordinates == undefined) {
            $geolocation.getCurrentPosition().then(function(data){
                $rootScope.coordinates = {lat:data.coords.latitude, long:data.coords.longitude};
                $scope.getEventsByCategories($rootScope.coordinates);
            });
        } else {
            $scope.getEventsByCategories($rootScope.coordinates);
        }

    };

    $scope.getEventsByCategories = function(location){
        EventsService.getEvents(location, $scope.category.endpoint , $scope.category.path, $scope.eventsCurrentPage, $scope.pageMaxSize).then(function(data){
            $rootScope.listOfEvents = data.data.response.hits.hits;
            $rootScope.eventsTotalItems = data.data.response.hits.total;
        });
    };
    


    $scope.getUserLocation();

    $scope.viewMore = function(id) {
        $state.go('event');
    }

    $scope.selectEventInfo = function(eventInfo) {
        $rootScope.selectedEvent = eventInfo;
    }

    $scope.loadMore = function() {
        console.log('first load more');
        $scope.eventsCurrentPage += 20;
        EventsService.getEvents($rootScope.coordinates, $scope.category.endpoint , $scope.category.path, $scope.eventsCurrentPage, $scope.pageMaxSize).then(function(data){
            console.log('final load more');

            for(var i = 0; i < data.data.response.hits.hits.length; i++) {
                $rootScope.listOfEvents.push(data.data.response.hits.hits[i]);
            }
            $scope.loadingMoreInformation = false;
        });
    }

    $(window).scroll(function() {
        console.log('Testing scroll');
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 800 && $scope.loadingMoreInformation == false) {
            console.log("First If");
            console.log($rootScope.listOfEvents.length);
            console.log($rootScope.eventsTotalItems);
            if($rootScope.listOfEvents.length < $rootScope.eventsTotalItems) {
                console.log('aaaa');
                $scope.loadingMoreInformation = true;
                $scope.loadMore();
            }
        }
    });


    $scope.pagination = 0;

    
});