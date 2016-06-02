function FilmController($routeParams) {
	var ctrl = this;
	ctrl.filmId = $routeParams.filmId;
}

angular.module('film-detail',['ngRoute'])

.component('filmDetail',
	{
  		templateUrl: 'filmdetail.html',
  		controller: FilmController,
  		bindings:
  		{
    		filmitem: '<'
  		}
	});