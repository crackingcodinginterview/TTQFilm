(function () {
	var app = angular.module('movieApp');
	app.factory('DatabaseService',function(){
		var service = {};
		service.createUserDatabase = createUserDatabase;
		service.uploadFilmDatabase = uploadFilmDatabase;
		return service;

		function createUserDatabase(user, displayName, role) {

			console.log(user);
			firebase.database().ref("user/" + user.uid).set({
				uid: user.uid,
				email: user.email,
				name: displayName,
				role: role
			})
		};

		function uploadFilmDatabase(data) {
			console.log(data);
		}
	});
}());