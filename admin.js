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

var app = angular.module('mainApp', ['ngFx', 'ngAnimate']);

app.controller('mainCtr', ['$scope', function($scope){
	window.sc = $scope;
	sc.user = {};

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

}])

 $(document).ready(function(){
    $('ul.tabs').tabs();
  });