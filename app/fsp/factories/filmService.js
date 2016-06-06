(function () {
	var app = angular.module('movieApp');
	app.factory('FilmService', function($firebaseObject, $firebaseArray){
		var service = {};
		service.getFilms = getFilms;
		//service.getActionFilms = getActionFilms;
		service.SearchFilm = SearchFilm;
		return service;

		function getFilms(){
			var listFilmsRef = firebase.database().ref();
			return $firebaseObject(listFilmsRef.child("FilmsList"));
		}


		// function getActionFilms(){
  //     		var FilmsRef = firebase.database().ref();
	 //      	return $firebaseObject(FilmsRef.child("FilmsList").child("Type").child("Action"));
		// }

		function SearchFilm(abc)
		{
			var ref = firebase.database().ref().child("FilmsList").child("Type").child("Action");
			//var films = $firebaseArray(ref);
			//return films;
			ref.orderByChild("Name_En").equalTo(abc).on("child_added", function(snapshot) {
  				console.log(snapshot.val());
  			})
			//console.log(films);
		}

	});
}());