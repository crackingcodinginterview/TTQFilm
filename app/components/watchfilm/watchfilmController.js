(function(){
	var app = angular.module('movieApp');

	app.controller('watchfilmController', function($scope,$stateParams){
		$scope.film = {};
		$scope.film = $stateParams.phimdetail;
	});
}());