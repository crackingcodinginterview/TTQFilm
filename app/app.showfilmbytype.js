(function(){
    var app = angular.module('movieApp');

    app.controller('NavbarFilmTypeController', function($scope,FilmService){
    	//get all films
		var filmObject = FilmService.getFilms();
		filmObject.$bindTo($scope, "allfilms");

		filmObject.$loaded().then(function(){
			console.log($scope.allfilms);
		});

		$scope.convertURL = function(name){
			name = FilmService.convertURL(name);
			return name;
		}
    });
}());