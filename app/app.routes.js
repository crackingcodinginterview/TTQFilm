/**
 * Created by Administrator on 30/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url : "/home",
                templateUrl : 'app/components/home/homeView.html'
            })
            .state('login', {
                url : '/login',
                templateUrl : 'app/components/login/loginView.html'
            })
            .state('register', {
                url : '/register',
                templateUrl : 'app/components/register/registerView.html'
            });
    });
}());