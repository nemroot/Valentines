app.controller('MainController', function($rootScope , $scope, $location, $window , $geolocation , $http , $interval , $state ,EventsService ) {
    $header = $('header');
    $body = $('body');
    $profile = $('.profilePlace');
    $slider = $('.slider__list');


    //Slider List
    $scope.sliderItem = [
        'http://media.istockphoto.com/photos/business-people-at-cafe-picture-id518867576?s=2048x2048',
        'https://xceed.me/bundles/site/img/home3.jpg',
        'https://xceed.me/bundles/site/img/home2.jpg'
    ];

    //Root Scopes
    $scope.showPopup = false;
    $scope.loginOpen = false;
    $scope.userInformation = {};
    $scope.isLogined = false;
    $scope.userAvatar = '';
    $scope.profileOpen = false;
    $scope.mainPage = true;
    $scope.currentSlide = 0;
    $scope.categoriesList = [];
    $rootScope.categoryParams = {};
    $scope.showLoginSection = true;
    $scope.register = {};
    $scope.login = {};

    $scope.showCategories = function() {
        $scope.showPopup = true;
        $body.css('overflow' , 'hidden');
    };

    $scope.hideCategories = function() {
        $scope.showPopup = false;
        $body.css('overflow' , 'auto');
    };

    $scope.openLogin = function() {
        $scope.loginOpen = true;
    };

    $scope.closePrPopup = function() {
        $scope.loginOpen = false;
        $scope.showLoginSection = true;
    }

    $scope.changeLoginView = function(value) {
        $scope.showLoginSection = value;
    }



    $rootScope.$on('$stateChangeSuccess', function(){
        $scope.showPopup = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if($location.path() === '/') {
            $header.removeClass('inner');
            $scope.mainPage = true;
        } else {
            $header.addClass('inner');
            $scope.mainPage = false;
        }
    });

    

    $scope.backBtn = function() {
        $window.history.back();
    };

    $scope.checkUser = function() {
        if($scope.isLogined == false){
                $http.get('/profile/me').then(function(data){
                    console.log(data.data);
                    if(data.data.logedin == 'true') {
                        $scope.userInformation = data.data.user.result._source;
                        $scope.isLogined = true;
                        $http.get('https://graph.facebook.com/'+ $scope.userInformation.userId +'?fields=picture.width(720).height(720)&access_token='+ $scope.userInformation.access_token).then(function(data){
                            if(data.data.picture.data.url) {
                                $scope.userAvatar = data.data.picture.data.url;
                            } else {
                                $scope.userAvatar = 'https://blog.teachlr.com/wp-content/uploads/2016/06/hero-avatar.png';
                            }
                        });
                    }
                }).catch(function(response){console.log(response)});
           
            

        }
    };

    $scope.profileToggle = function(e) {
        if($scope.isLogined == true) {
            if($scope.profileOpen == false) {
                $scope.profileOpen = true;
            } else {
                $scope.profileOpen = false;
            }
        }
    };

    $scope.checkUser();

    $geolocation.getCurrentPosition().then(function(data){
        $rootScope.currentCoors = {lat:data.coords.latitude, long:data.coords.longitude};
    });

    $scope.getPlacesInfo = function(catInformation) {
        $rootScope.categoryParams = catInformation;
    }


    //Get Categories List
    $scope.getCategories = function(){
        $http({
            url: 'http://localhost:8080/proxy/doors?endpoint='+ Conf.api.endpoint +'/&path=categoryList?',
            method: 'GET'
        }).then(function(data){
            console.log(data);
            $scope.categoriesList = data.data;
        })
    }
    

    $scope.getCategories();

    //Scope Register User
    $scope.signUp = function() {
        $scope.register.profilePicture = localStorage.getItem('profilePicture');

        $scope.registerData = {
                email : $scope.register.email,
                firstName : $scope.register.firstName,
                lastName : $scope.register.lastName,
                password : $scope.register.password,
                profilePicture : $scope.register.profilePicture
        }
        localStorage.removeItem('profilePicture');



        if(!$scope.register.email ||
            !$scope.register.firstName ||
            !$scope.register.lastName ||
            !$scope.register.password||
            $scope.register.password != $scope.register.repeatPassword) {
            
            if($scope.register.password != $scope.register.repeatPassword) {
                $("#registerRepeatPassword").addClass('error');
            }

            if(!$scope.register.email) { $("#registerEmail").addClass('error') } else {$("#registerEmail").removeClass('error')}
            if(!$scope.register.firstName) { $("#registerFirstName").addClass('error') } else {$("#registerFirstName").removeClass('error')}
            if(!$scope.register.lastName) { $("#registerLastName").addClass('error') } else {$("#registerLastName").removeClass('error')}
            if(!$scope.register.password) { $("#registerPassword").addClass('error') } else {$("#registerPassword").removeClass('error')}

            

            return false;
        }


        $http({
                method: 'POST',
                data : $scope.registerData,
                url: '/user'
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
    }

    $scope.signIn = function() {
        $http({
            method: 'POST',
            data : $scope.login,
            url: '/user/checkUser'
        }).then(function successCallback(response) {

                if(response.data.status == 200) {
                    $scope.loginOpen = false;
                    $scope.isLogined = true;
                    $scope.userInformation.name  = response.data.data.Item.firstName + ' ' + response.data.data.Item.lastName;
                    $scope.userInformation.email = response.data.data.Item.email;
                    if(response.data.data.Item.profilePicture) {
                        $scope.userAvatar = response.data.data.Item.profilePicture;
                    } else {
                        $scope.userAvatar = 'https://blog.teachlr.com/wp-content/uploads/2016/06/hero-avatar.png';
                    }
                } else {
                    $("#loginError").addClass('alert--visible').text(response.data.errorMessage);
                }
                
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    //Slider
    $scope.slider = function() {
        if($scope.currentSlide >= $scope.sliderItem.length - 1) {
            $scope.currentSlide = 0;
            $('.slider__item').removeClass('active');
            $('.slider__item').eq($scope.currentSlide).addClass('active');
        } else {
            $scope.currentSlide++;
            $('.slider__item').removeClass('active');
            $('.slider__item').eq($scope.currentSlide).addClass('active');
        }
    }
    if($scope.sliderItem) $interval($scope.slider, 5000);

    $scope.createEventCheck = function() {
        if($scope.isLogined) {
            $state.go('profile.createEvent');
        } else {
            $scope.loginOpen = true;
        }
    }
});
