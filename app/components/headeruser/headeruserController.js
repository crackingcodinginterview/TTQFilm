/**
 * Created by Administrator on 01/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('headeruserController', function($scope, AuthenticationService, Notification, $state, GoogleAnalyticService){
        $scope.signOut = function(){
            GoogleAnalyticService.send({
                hitType: 'event',
                eventCategory: 'Logout',
                eventAction: 'None',
                eventLabel: 'Phim Moi'
            });
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
    })
}());