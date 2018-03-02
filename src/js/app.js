var app = angular.module('doorsAround', ['ui.router', 'ngGeolocation', 'infinite-scroll' , 'ngMap', 'angularLazyImg']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $state) {
    // For unmatched routes

    // Application routes
    $stateProvider
        .state('/', {
            url: '/',
            views : {
                main : {
                    templateUrl: 'pages/main.html',
                    controller: 'HomeController'
                },
            }
        })

        //Category States
        .state('category', {
            url: '/category/:categoryType',
            views : {
                main : {
                    templateUrl: 'pages/events/events.html',
                    controller: 'EventsController',
                    params : null
                },
            }
        })

        .state('event', {
            url: '/event/:id',
            views : {
                main : {
                    templateUrl: 'pages/events/more.html',
                    controller: 'EventsInnerController'
                },
            }
        })

        //Profile States
        .state('profile', {
            url: '/profile',
            views : {
                main : {
                    templateUrl: 'pages/profile/profile.html',
                    controller: 'ProfileController'
                },
                profile : {
                    templateUrl: 'pages/profile/edit.html',
                    controller: 'ProfileController'
                }
            },
            redirectTo: 'profile.edit',
        })

        .state('profile.edit', {
            url: '/edit',
            views : {
                main : {
                    templateUrl: 'pages/profile/profile.html',
                    controller: 'ProfileController',
                },
                profile : {
                    templateUrl: 'pages/profile/edit.html',
                    controller: 'ProfileController'
                }
            }
        })

        .state('profile.events', {
            url: '/events',
            views : {
                main : {
                    templateUrl: 'pages/profile/profile.html',
                    controller: 'ProfileController'
                },
                profile : {
                    templateUrl: 'pages/profile/events.html',
                    controller: 'ProfileController'
                }
            }
        })

        .state('profile.createEvent', {
            url: '/createEvent',
            views : {
                main : {
                    templateUrl: 'pages/profile/profile.html',
                    controller: 'ProfileController'
                },
                profile : {
                    templateUrl: 'pages/profile/createEvent.html',
                    controller: 'ProfileController'
                }
            }
            
        })

        .state('profile.saved', {
            url: '/saved',
            views : {
                main : {
                    templateUrl: 'pages/profile/profile.html',
                    controller: 'ProfileController'
                },
                profile : {
                    templateUrl: 'pages/profile/saved.html',
                    controller: 'ProfileController'
                }
            }
        })


    $locationProvider.html5Mode(false).hashPrefix('');; 
    $urlRouterProvider.otherwise('/');

}]);
