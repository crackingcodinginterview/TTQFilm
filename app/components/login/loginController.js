/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('loginController', function($scope, Notification, AuthenticationService, GoogleAnalyticService, $state){
        $scope.user = {};

        $scope.signInWithEmailAndPassword = function() {
            $scope.isWaiting = true;
            GoogleAnalyticService.send({
                hitType: 'event',
                eventCategory: 'Login',
                eventAction: 'Email',
                eventLabel: 'Phim Moi'
            });
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
            GoogleAnalyticService.send({
                hitType: 'event',
                eventCategory: 'Login',
                eventAction: 'Facebook',
                eventLabel: 'Phim Moi'
            });
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