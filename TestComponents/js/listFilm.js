function ListFilmController($scope,$http) {
	var ctrl = this;

	ctrl.list = {};

	$http.get('data.json').then(function(response){
                ctrl.list = response.data.listfilm;      
        	});
}

angular.module('film-module', []).component('listFilm',
	{
  		templateUrl: 'listFilm.html',
  		controller: ListFilmController
	});