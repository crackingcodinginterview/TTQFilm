/**
 * Created by Administrator on 03/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('changepasswordController', function($scope, AuthenticationService, Notification){
        $scope.user = {};
        $scope.isWaiting = false;

        function firstCheck(user){
            if(user.password !== user.repeatPassword)
                return false;
            return true;
        };
        $scope.updatePassword = function(){
            $scope.isWaiting = true;
            if(firstCheck($scope.user)){
                AuthenticationService.updatePassword($scope.user.password).then(
                    function(response){
                        if(response.success)
                            Notification.primary(response.message);
                        else
                            Notification.error(response.message);
                        $scope.isWaiting = false;
                    });
            }
            else{
                Notification.error('Nhập lại mật khẩu chưa đúng.')
                $scope.isWaiting = false;
            }
        };
    });
}());