(function(){
	var app = angular.module('movieApp');
	app.config(function (localStorageServiceProvider) {
		localStorageServiceProvider
		.setPrefix('movieApp')
		.setStorageType('sessionStorage');
	});
}());