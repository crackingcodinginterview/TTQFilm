/**
 * Created by Administrator on 01/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('headeruserController', function($scope, AuthenticationService, Notification, $state){
        $scope.signOut = function(){
            AuthenticationService.signOut().then(
                function(response){
                    if(response.success)
                        Notification.primary(response.message);
                    else
                        Notification.error(response.message);
                }
            );
        };

        $scope.signInWithFacebook = function(){
            AuthenticationService.signInWithFacebook().then(
                function(response){
                    if(response.success){
                        Notification.primary(response.message);
                        AuthenticationService.setCredential(response.accountInfo);
                        $state.go('app');
                    }
                    else
                        Notification.error(response.message);
                }
            )
        };
    })
}());