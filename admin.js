/**
* mainApp Module
*
* Description
*/

var config = {
	apiKey: "AIzaSyABmwpvdLmJDqdkZF7F7pVFsANqfF48qR4",
	authDomain: "dack-ptudw-be6ac.firebaseapp.com",
	databaseURL: "https://dack-ptudw-be6ac.firebaseio.com",
	storageBucket: "dack-ptudw-be6ac.appspot.com",
};
firebase.initializeApp(config);

var app = angular.module('mainApp', ['ngFx', 'ngAnimate', 'firebase']);

app.controller('mainCtr', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
	window.sc = $scope;
	sc.user = {};
	sc.userList = [];

	var ref = firebase.database().ref().child("user");
	var syncObject = $firebaseObject(ref);

	syncObject.$bindTo($scope, "user");

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log(user);
			sc.user = user;
		} else {
			console.log("Sign out!");
		}
	});

	sc.Signin =  function (email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  console.log(error);
		  sc.error = error;
		  // ...
		});
	}

	sc.showUserList = function () {
		sc.userList = Object.keys(sc.user).map(function (key) {return sc.user[key]});	
	}

}])

$(document).ready(function(){
	$('ul.tabs').tabs();
});