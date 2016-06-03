(function(){
	var app = angular.module('movieApp');

	app.controller('watchfilmController', function($scope,$stateParams){
		console.log($stateParams.id);
	});
}());