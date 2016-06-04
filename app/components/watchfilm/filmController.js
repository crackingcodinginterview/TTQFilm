(function(){
	var app = angular.module('movieApp');

	app.controller('filmController', function($state,$scope){
		$scope.film = {};

		$scope.film = $state.params.filminfo;

		$state.get('app.filmwatching').data.pageTitle = "Xem phim " + $scope.film.Name_Vi;
	})

}());