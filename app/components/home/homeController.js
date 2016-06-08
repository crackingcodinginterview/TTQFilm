(function(){
	var app = angular.module('movieApp');

	app.controller('ListFilmController', function ($scope,FilmService) {
		window.sc = $scope;
		sc.isLoading = true;

		//get all films
		var filmObject = FilmService.getFilms();
		filmObject.$bindTo(sc, "films");

		//get 10 action films by priority
		sc.actionfilms = FilmService.getActionFilms();

		//get 10 cartoon films by priority
		sc.cartoonfilms = FilmService.getCartoonFilms();

		sc.convertURL = function(name){
			name = FilmService.convertURL(name);
			return name;
		}

	});
}());
