/**
 * Created by Administrator on 03/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('registerController', function($scope, UserService, Notification, GoogleAnalyticService){
        $scope.user = {};
        $scope.isWaiting = false;

        function firstCheck(user){
            if(user.password !== user.repeatPassword)
                return false;
            return true;
        }

        $scope.register = function(){
            $scope.isWaiting = true;
            GoogleAnalyticService.send({
                hitType: 'event',
                eventCategory: 'Register',
                eventAction: 'None',
                eventLabel: 'Phim Moi'
            });
            if(firstCheck($scope.user)) {
                $scope.isWaiting = true;
                UserService.createUserWithEmailAndPassword($scope.user).then(
                    function(response){
                        if(response.success)
                            Notification.primary(response.message);
                        else
                            Notification.error(response.message);
                        $scope.isWaiting = false;
                    }
                );
            }
            else{
                Notification.error('Nhập lại mật khẩu chưa đúng.')
                $scope.isWaiting = false;
            }
        };
    });
}());