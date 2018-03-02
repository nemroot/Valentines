app.controller('HomeController', function($scope, $window ) {

    var $header = $('header');


    $(window).scroll(function() {
        console.log('aaa');
        var currentScroll = $(window).scrollTop();
        if(currentScroll > 0) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

});
