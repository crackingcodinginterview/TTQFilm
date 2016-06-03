/**
 * Created by Administrator on 02/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('AuthenticationService', function(UserService){
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
        function setCredential(currentUser){
            
        };
        function clearCredential(){
            return UserService.logout().then(
                function(response){
                    return response;
                },
                function(response){
                    return response;
                }
            );
        };
    });
}());