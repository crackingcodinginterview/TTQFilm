(function () {
	var app = angular.module('movieApp');
	app.factory('DatabaseService',function(){
		var service = {};
		service.createUserDatabase = createUserDatabase;
		return service;

		var database = firebase.database();

		function createUserDatabase(user, displayName, role) {
			console.log(user);
			firebase.database().ref("user/" + user.uid).set({
				email: user.email,
				name: displayName,
				role: role
			})
		};
  });
}());