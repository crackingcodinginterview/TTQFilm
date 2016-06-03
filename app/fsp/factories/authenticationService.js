/**
 * Created by Administrator on 02/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('AuthenticationService', function(UserService, $rootScope, $cookies){
        var service = {};
        service.login = login;
        service.setCredential = setCredential;
        service.clearCredential = clearCredential;
        return service;

        function login(user){
            return UserService.login(user).then(
                function(response){
                    return response;
                },
                function(response){
                    return response;
                }
            );
        };
        function setCredential(user){
            $rootScope.globals = {
                currentUser : {
                    email : user.email,
                }
            }
            $cookies.putObject('globals', $rootScope.globals);
        };
        function clearCredential(){
            $rootScope.globals = {};
            $cookies.remove('globals');
        };
    });
}());