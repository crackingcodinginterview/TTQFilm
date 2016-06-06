/**
 * Created by Administrator on 02/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('AuthenticationService', function(UserService, $rootScope, $state, $interval, blockUI){
        var service = {};
        service.login = login;
        service.waitForUser = waitForUser;
        service.authorize = authorize;
        service.setCredential = setCredential;
        service.clearCredential = clearCredential;
        service.loginWithFacebook = loginWithFacebook;
        service.updatePassword = updatePassword;
        return service;

        function updatePassword(newPassword){
            return UserService.updatePassword($rootScope.globals.currentUser, newPassword).then(
                function(response){
                    return response;
                },
                function(response){
                    return response;
                }
            );
        }
        function authorize(){
            var roles = $rootScope.toState.data.role;
            var role = $rootScope.globals.role;
            if(roles.indexOf(role) === -1) {
                $state.go('app.accessdenied');
            }
        }
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
        function waitForUser(){
            blockUI.start();
            var stop = $interval(
                function(){
                    if($rootScope.globals.role !== undefined){
                        blockUI.stop();
                        authorize();
                        $interval.cancel(stop);
                    }
                }, 50
            );
        };
        function loginWithFacebook(){
            return UserService.loginWithFacebook().then(
                function(response){
                    return response;
                },
                function(response){
                    return response;
                }
            );
        }
        function setCredential(currentUser){
            $rootScope.globals = {
                currentUser : currentUser,
                role : currentUser === null ? 'GUESS' : currentUser.email != null && currentUser.email.indexOf('@admin') !== -1
                    ? 'ADMIN' : 'USER',
            };
            $rootScope.$apply();
            service.authorize();
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