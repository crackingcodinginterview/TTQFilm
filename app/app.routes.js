/**
 * Created by Administrator on 30/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url : '/',
                templateUrl : 'app/components/home/homeView.html'
            });
    });
}());