/**
 * Created by Administrator on 02/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('AuthenticationService', function(UserService, $rootScope, $state, $cookies){
        var service = {};
        service.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
        service.authorize = authorize;
        service.getLastCredential = getLastCredential;
        service.setCredential = setCredential;
        service.signOut = signOut;
        service.signInWithFacebook = signInWithFacebook;
        service.updatePassword = updatePassword;
        service.signInWithEmailAndPassword = signInWithEmailAndPassword;
        return service;

        function authorize(){
            var roles = $rootScope.toState.data.role;
            var role = $rootScope.globals.accountInfo.role;
            if(roles.indexOf(role) === -1) {
                $state.go('app.accessdenied');
            }
        };
        function getLastCredential(){
            $rootScope.globals = $cookies.getObject('user') || {
                    accountInfo : {
                        role : 'GUESS'
                    }
                };
        };
        function setCredential(accountInfo){
            $rootScope.globals = {
                accountInfo : accountInfo
            };
            $cookies.putObject('user', $rootScope.globals);
        };
        function signOut(){
            $cookies.remove('user');
            $rootScope.globals.accountInfo = {
                role : 'GUESS',
            };
            return UserService.signOut();
        };
        function updatePassword(newPassword){
            return UserService.updatePassword($rootScope.globals.accountInfo.info, newPassword).then(
                function(response){
                    if(response.success){
                        $rootScope.globals.accountInfo.info.password = newPassword;
                        setCredential($rootScope.globals.accountInfo);
                    }
                    return response;
                }
            )
        }
        function createUserWithEmailAndPassword(user){
            return UserService.createUserWithEmailAndPassword(user);
        };
        function signInWithEmailAndPassword(user){
            return UserService.signInWithEmailAndPassword(user);
        };
        function signInWithFacebook(){
            return UserService.signInWithFacebook();
        };
    });
}());