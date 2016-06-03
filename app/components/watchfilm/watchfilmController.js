(function(){
	var app = angular.module('movieApp');

	app.controller('watchfilmController', function($scope,$stateParams, $state){
		window.sc = $scope;
		sc.film = {};

		sc.film = $stateParams.filmdetail;

		$state.get('app.watchfilm').data.pageTitle = "Xem phim | " + sc.film.Name_Vi;
	});
}());