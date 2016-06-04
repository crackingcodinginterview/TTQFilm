/**
* mainApp Module
*
* Description
*/
var app = angular.module('mainApp', []);
app.controller('mainCtr', ['$scope', function($scope){
	window.sc = $scope;
}]);