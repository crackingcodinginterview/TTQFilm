/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('loginController', function($scope, Notification, AuthenticationService, $state){
        $scope.user = {};

        $scope.login = function() {
            $scope.isWaiting = true;
            AuthenticationService.signInWithEmailAndPassword($scope.user).then(
                function (response) {
                    if (response.success) {
                        Notification.primary(response.message);
                        console.log(response);
                        AuthenticationService.setCredential(response.accountInfo);
                        $state.go('app');
                    }
                    else
                        Notification.error(response.message);
                    $scope.isWaiting = false;
                }
            );
        };

        $scope.loginWithFacebook = function(){
            AuthenticationService.loginWithFacebook().then(
                function(response){
                    if(response.success){
                        $state.go('app');
                        Notification.primary(response.message);
                    }
                    else
                        Notification.error(response.message);
                }
            )
        };
    });
}());