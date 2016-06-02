angular.module('myApp', ['film-module','film-detail','ngAnimate','ngRoute','ngFx'])

.controller('mainController', function(){
	
})

.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
})

.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider.
        when('/films', {
          template: '<list-film></list-film>'
        }).
        when('/films/:filmId', {
          template: '<film-detail></film-detail>'
        }).
        otherwise('/films');
    }
])

.directive('flexSlider', function () {
  return {
    link: function (scope, element, attrs) {
      element.flexslider({
        animation: "fade",
        animationLoop: true,
        itemMargin: 5,
        animationSpeed: 1000,
        controlNav: false,
        controlsContainer: '.flex-container'
      });
    }
  }
});