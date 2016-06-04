var config = {
	apiKey: "AIzaSyABmwpvdLmJDqdkZF7F7pVFsANqfF48qR4",
	authDomain: "dack-ptudw-be6ac.firebaseapp.com",
	databaseURL: "https://dack-ptudw-be6ac.firebaseio.com",
	storageBucket: "dack-ptudw-be6ac.appspot.com",
};
firebaseApp = firebase.initializeApp(config);
/**
* mainApp Module
*
* Description
*/
var app = angular.module('mainApp', []);
app.controller('mainCtr', ['$scope', function($scope){
	window.sc = $scope;
}]);