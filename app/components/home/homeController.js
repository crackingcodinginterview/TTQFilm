(function(){
	var app = angular.module('movieApp');

	app.controller('ListFilmController', function ($scope,$http) {
		var ctrl = this;
		window.sc = $scope;

		ctrl.phimhanhdong = {};
		ctrl.phimhoathinh = {};

		sc.getPhim = function (){
			$http.get('https://api.myjson.com/bins/1pfn2').then(function(response){
				ctrl.phimhanhdong = response.data;
			});

			$http.get('https://api.myjson.com/bins/1cse6').then(function(response){
				ctrl.phimhoathinh = response.data;
			});
		}


		sc.getPhim();
	});
}());
