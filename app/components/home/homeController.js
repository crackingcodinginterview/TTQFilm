(function(){
	var app = angular.module('movieApp');

	app.controller('ListFilmController', function ($scope,$http) {
		window.sc = $scope;
		sc.isLoading = true;
		sc.phimhanhdong = {};
		sc.phimhoathinh = {};

		sc.getPhim = function (){
			$http.get('https://api.myjson.com/bins/4wq9a').then(function(response){
				sc.phimhanhdong = response.data;
			});	

			$http.get('https://api.myjson.com/bins/2vusu').then(function(response){
				sc.phimhoathinh = response.data;
			});
		};

		sc.getPhim();
	});
}());
