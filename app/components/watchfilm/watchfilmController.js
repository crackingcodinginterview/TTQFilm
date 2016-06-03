(function(){
	var app = angular.module('movieApp');

	app.controller('watchfilmController', function($scope,$stateParams){
		window.sc = $scope;
		sc.film = {};

		sc.film = $stateParams.filmdetail;
	});
}());