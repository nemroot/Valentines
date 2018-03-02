app.controller('EventsInnerController', function($rootScope , $scope, $stateParams ,$http, $geolocation , $window , $state, EventsService , NgMap ) {
    $scope.eventId = $stateParams.id;
    $scope.coordinates = [];
    $scope.currentCoordinates = [];
    $scope.review = {
        placeId : $scope.eventId
    };
    
    $scope.reviewList = [];

    if($rootScope.selectedEvent != undefined) {
        $scope.coordinates = [$rootScope.selectedEvent.location.lat, $rootScope.selectedEvent.location.lon];
        $scope.review.placeId = $rootScope.selectedEvent.id;
        $scope.currentCoordinates = [$rootScope.coordinates.lat, $rootScope.coordinates.long];  

        $http.get('/proxy/review?placeId=' + $scope.eventId  + '&page=0&size=10').then(function(data){
            $scope.reviewList = data.data.response.hits.hits;
        });
    }  else {
        $http.get('http://localhost:8080/proxy/place?placeId=' + $scope.eventId).then(function(data){

            $rootScope.selectedEvent = data.data;
            $scope.coordinates = [$rootScope.selectedEvent.location.lat, $rootScope.selectedEvent.location.lon];
        });

        $http.get('/proxy/review?placeId=' + $scope.eventId  + '&page=0&size=10').then(function(data){
            $scope.reviewList = data.data.response.hits.hits;
            console.log($scope.reviewList);
        });


        console.log($scope.reviewList);
    }

    $('.rating-star').mouseenter(function(){
        $('.rating-star-info').width(30 * $(this).data('index'));
    }).mouseleave(function(){
        $('.rating-star-info').width(30 * $scope.review.rating);
    }).click(function(){
        $scope.review.rating = $(this).data('index');
        $('.rating-star-info').width(30 * $scope.review.rating);
    })


    $scope.addReview = function() {
        console.log('Posting review');
        
        console.log('User Information',$scope.userInformation);
        if($scope.isLogined === true) {
            $scope.review.userId = $scope.userInformation.userId,
            console.log('Is loginned');
            if(!$scope.review.rating || 
                !$scope.review.reviewText
                || $scope.review.reviewText == '' 
                || $scope.review.rating == 0) {
            } else {
                $http({
                method: 'POST',
                data : $scope.review,
                url: '/proxy/review'
                }).then(function successCallback(response) {
                    console.log("Finishing Posting Review");
                    console.log('RESPONSE', response);
                    var userInfo = {
                        _source : {
                            name : $scope.userInformation.name,
                            picture : $scope.userInformation.picture
                        }
                    }
                    $scope.review.user = userInfo;
                    var newReview = {
                        _source : $scope.review
                    }
                    $scope.reviewList.unshift(newReview);
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });

            }
        } else {
            console.log('User Needs Sign In');
        }
    };

});