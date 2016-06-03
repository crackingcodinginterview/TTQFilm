/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('loginController', function($scope, Notification, AuthenticationService, $state, $timeout){
        $scope.user = {};

        $scope.login = function() {
            $scope.isWaiting = true;
            AuthenticationService.login($scope.user).then(
                function (response) {
                    if (response.success) {
                        Notification.primary(response.message);
                        $timeout(function () {
                            $state.go('app');
                        }, 1000);
                    }
                    else {
                        Notification.error(response.message);
                    }
                    $scope.isWaiting = false;
                }
            );
        }
    });
}());