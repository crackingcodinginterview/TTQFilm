/**
 * Created by Administrator on 01/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('headeruserController', function($scope, AuthenticationService){
        $scope.logout = function(){
            AuthenticationService.clearCredential();
        }
    })
}());