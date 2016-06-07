(function () {
	var app = angular.module('movieApp');

	app.factory('DatabaseService',function($firebaseObject){
		var service = {};
		service.createUserDatabase = createUserDatabase;
		service.uploadFilmDatabase = uploadFilmDatabase;
		service.isUidExist = isUidExist;
		service.getUser = getUser;
		return service;

		//Thanh Tri & Minh Quoc
		function createUserDatabase(user) {
			firebase.database().ref("user/" + user.uid).set({
				uid: user.uid,
				email: user.email,
				name: user.name,
				role: user.role,
				status : user.status
			})
		};

		//Thanh Tri
		function uploadFilmDatabase(data, path) {
			console.log(data);
			var ref = firebase.database().ref('FilmsList');
			var FilmsObject = $firebaseObject(ref);
			var FilmsData = {};
			return FilmsObject.$loaded().then(
				function(response){
					console.log(FilmsObject);
					if (FilmsObject.AdminUpload === undefined)
						FilmsObject.AdminUpload = [];
					FilmsObject.AdminUpload.push(data);
					console.log(FilmsObject);
					FilmsObject.$save();
					return FilmsObject.AdminUpload;
				});
		}
		function getUser(uid){
			var ref = firebase.database().ref().child('user').child(uid);
			var userRef = $firebaseObject(ref);
			return userRef.$loaded().then(
				function(response){
					return response;
				}
			);
		};

		function isUidExist(uid){
			return firebase.database().ref().child('user').once('value').then(
				function(response){
					return response.hasChild(uid);
				}
				);
		};
	});
}());