(function () {
	var app = angular.module('movieApp');
	app.factory('DatabaseService',function($firebaseObject){
		var service = {};
		service.createUserDatabase = createUserDatabase;
		service.isUidExist = isUidExist;
		service.getUser = getUser;
		return service;

		function createUserDatabase(user) {
			firebase.database().ref("user/" + user.uid).set({
				uid: user.uid,
				email: user.email,
				name: user.name,
				role: user.role,
				status : user.status
			})
		};

		function getUser(uid){
			var ref = firebase.database().ref('user').child(uid);
			var userRef = $firebaseObject(ref);
			return userRef.$loaded().then(
				function(response){
					return response;
				}
			);
		};

		function isUidExist(uid){
			return firebase.database().ref('user').once('value').then(
				function(response){
					return response.hasChild(uid);
				}
			);
		};
	});
}());