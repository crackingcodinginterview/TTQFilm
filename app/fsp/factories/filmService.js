(function () {
	var app = angular.module('movieApp');
	app.factory('FilmService', function($firebaseObject){
		var service = {};
		service.getFilms = getFilms;
		return service;

		function getFilms(){
      		var listFilmsRef = firebase.database().ref();
	      	return $firebaseObject(listFilmsRef.child("FilmsList"));
		}

	});
}());