angular.module('myApp', ['film-module','ngAnimate','ngRoute','ngFx'])

.controller('mainController', function(){
	
})

.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});