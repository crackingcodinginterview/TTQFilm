/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('loginController', function($scope, Notification, AuthenticationService, $state){
        $scope.user = {};

        $scope.signInWithEmailAndPassword = function() {
            $scope.isWaiting = true;
            AuthenticationService.signInWithEmailAndPassword($scope.user).then(
                function (response) {
                    if (response.success) {
                        Notification.primary(response.message);
                        AuthenticationService.setCredential(response.accountInfo);
                        $state.go('app');
                    }
                    else
                        Notification.error(response.message);
                    $scope.isWaiting = false;
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
    });
}());