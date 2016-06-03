/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('loginController', function($scope, Notification, AuthenticationService, $state, $timeout, $cookies){
        AuthenticationService.login({email : 'testtest@gmail.com', password : '123456'}).then(
            function(response){
                if(response.success){
                    Notification.success(response.message);
                    $timeout(function(){
                        AuthenticationService.setCredential({email : 'testtest@gmail.com', password : '123456'});
                        $state.go('app');
                    }, 1000);
                }
                else{
                    Notification.warning(response.message);
                }
            }
        );
    });
}());