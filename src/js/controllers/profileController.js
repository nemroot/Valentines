app.controller('ProfileController', function($rootScope,$scope, $window, $geolocation ) {
    $scope.mapLoading = true;
    $scope.eventRegister = {
        name: '',
		description: '',
		email: '',
		location: {
			lat: '',
			lon: '' 
		},
		date: {
			startDate: new Date(),
			endDate: new Date()
		},
		coverPicture1: '',
		coverPicture2: '',
		coverPicture3: ''
    };


    if($rootScope.currentCoors) {
        $scope.coordinates = [$rootScope.currentCoors.lat,$rootScope.currentCoors.long];
        $scope.mapLoading = false;
        $scope.eventRegister.location.lat = $rootScope.currentCoors.lat;
        $scope.eventRegister.location.lon = $rootScope.currentCoors.long;
    } else {
        $geolocation.getCurrentPosition().then(function(data){
            $rootScope.currentCoors = {lat:data.coords.latitude, long:data.coords.longitude};
            $scope.coordinates = [$rootScope.currentCoors.lat,$rootScope.currentCoors.long];
            $scope.eventRegister.location.lat = $rootScope.currentCoors.lat;
            $scope.eventRegister.location.lon = $rootScope.currentCoors.long;
            $scope.mapLoading = false;
        });
    }

    $scope.createEvent = function() {
        console.log($scope.eventRegister);
    }
    
});
