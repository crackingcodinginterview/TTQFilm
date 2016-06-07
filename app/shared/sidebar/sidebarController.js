(function(){
	var app = angular.module('movieApp');

	app.controller('SideBarController', function ($scope,FilmService) {
		window.sc = $scope;
		sc.isLoading = true;

		//get 10 drama films by priority
		sc.dramafilms = FilmService.getDramaFilms();

		//get 10 funny films by priority
		sc.funnyfilms = FilmService.getFunnyFilms();

		sc.seriesfilms = FilmService.getSeriesFilms();

	});
}());