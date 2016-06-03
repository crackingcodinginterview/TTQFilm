(function(){
	var app = angular.module('movieApp');

	app.controller('watchfilmController', function($scope, $state){

		window.sc = $scope;
		sc.film = {};

		sc.film = $state.params.filmdetail;

		if(sc.film == null)
		{
			$state.go('app');
		}

		$state.get('app.watchfilm').data.pageTitle = "Xem phim | " + sc.film.Name_Vi;
	});
}());