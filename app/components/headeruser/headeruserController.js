/**
 * Created by Administrator on 01/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('headeruserController', function($scope, AuthenticationService, Notification){
        $scope.logout = function(){
            AuthenticationService.clearCredential().then(
                function(response){
                    if(response.success){
                        Notification.primary(response.message);
                    }
                    else{
                        Notification.error(response.message);
                    }
                }
            );
        };

        $scope.loginWithFacebook = function(){
            AuthenticationService.loginWithFacebook().then(
                function(response){
                    if(response.success){
                        Notification.primary(response.message);
                    }
                    else{
                        Notification.error(response.message);
                    }
                }
            )
        };
    })
}());