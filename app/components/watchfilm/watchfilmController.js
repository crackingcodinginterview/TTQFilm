(function(){
	var app = angular.module('movieApp');

	app.controller('watchfilmController', function($scope, $state, FilmService){

		window.sc = $scope;
		sc.film = {};

		sc.film = $state.params.filmdetail;

		if(sc.film == null)
			sc.film = FilmService.getCurrentFilm();

		FilmService.setCurrentFilm(sc.film);

		$state.get('app.watchfilm').data.pageTitle = sc.film.Name_Vi.toUpperCase();
		// console.log($state.get('app.watchfilm').data.pageTitle);
		sc.Watch = function(){
			var filmname = FilmService.convertURL(sc.film.Name_Vi);
			$state.go('app.filmwatching',{filminfo : sc.film, filmname : filmname});
		}
	});
}());