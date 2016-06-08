(function(){
	var app = angular.module('movieApp');

	app.controller('watchfilmController', function($scope, $state, FilmService){

		//window.sc = $scope;
		$scope.film = {};

		$scope.film = $state.params.filmdetail;

		if($scope.film == null)
			$scope.film = FilmService.getCurrentFilm();

		FilmService.setCurrentFilm($scope.film);

		console.log($scope.film);
		$state.get('app.watchfilm').data.pageTitle = $scope.film.Name_Vi.toUpperCase();
		// console.log($state.get('app.watchfilm').data.pageTitle);
		$scope.Watch = function(){
			var filmname = FilmService.convertURL($scope.film.Name_Vi);
			$state.go('app.filmwatching',{filminfo : $scope.film, filmname : filmname});
		}
	});
}());