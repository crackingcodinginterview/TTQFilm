(function(){
	var app = angular.module('movieApp');

	app.controller('ListFilmController', function ($scope,FilmService) {
		window.sc = $scope;
		sc.isLoading = true;

		var filmObject = FilmService.getFilms();

		// Load list film to sc.films
		filmObject.$bindTo(sc, "films");
	});
}());
