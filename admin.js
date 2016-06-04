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

var app = angular.module('mainApp', []);

app.controller('mainCtr', ['$scope', function($scope){
	window.sc = $scope;
	
}])