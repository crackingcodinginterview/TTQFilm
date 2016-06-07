(function () {
	var app = angular.module('movieApp');
	app.factory('FilmService', function($firebaseObject, $firebaseArray,localStorageService, $rootScope){
		var service = {};
		service.getFilms = getFilms;
		service.getActionFilms = getActionFilms;
		service.getCartoonFilms = getCartoonFilms;
		service.SearchFilm = SearchFilm;
		service.getCurrentFilm = getCurrentFilm;
		service.setCurrentFilm = setCurrentFilm;
		service.getLastCurrentFilm = getLastCurrentFilm;

		return service;
		//get all films
		function getFilms(){
			var listFilmsRef = firebase.database().ref();
			return $firebaseObject(listFilmsRef.child("FilmsList"));
		}

		//get 10 action films
		function getActionFilms(){
			var result = [];
      		var FilmsRef = firebase.database().ref().child("FilmsList").child("Type").child("Action");
      		FilmsRef.orderByPriority().limitToLast(15).on("child_added",function(snapshot){
      			result.push(snapshot.val());
      		});
      		return result;
		}

		//get 10 cartoon films
		function getCartoonFilms(){
			var result = [];
      		var FilmsRef = firebase.database().ref().child("FilmsList").child("Type").child("Cartoon");
      		FilmsRef.orderByPriority().limitToLast(15).on("child_added",function(snapshot){
      			result.push(snapshot.val());
      		});
      		return result;
		}

		//set film in type action by Name_En
		function SearchFilm(query)
		{
			var ref = firebase.database().ref().child("FilmsList").child("Type").child("Action");
			//var films = $firebaseArray(ref);
			//return films;
			ref.orderByChild("Name_En").equalTo(query).on("child_added", function(snapshot) {
  				console.log(snapshot.val());
  			})
			//console.log(films);
		}

		function setCurrentFilm(film){
			localStorageService.set('currentFilm',film);
			$rootScope.globals.currentFilm = film;
		}

		function getCurrentFilm(){
			return $rootScope.globals.currentFilm;
		}

		function getLastCurrentFilm(){
			$rootScope.globals.currentFilm = localStorageService.get('currentFilm');
		}

	});
}());