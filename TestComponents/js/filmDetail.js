function FilmController() {
	 var ctrl = this;
}

angular.module('film-module').component('filmDetail',
	{
  		templateUrl: 'filmdetail.html',
  		controller: FilmController,
  		bindings:
  		{
    		filmitem: '='
  		}
	});