/**
 * Created by Administrator on 30/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/trangchu");
        $stateProvider
            .state('home', {
                url : "/trangchu",
                templateUrl : 'app/components/home/homeView.html',
                ncyBreadcrumb: {
                    label: 'TRANG CHỦ'
                }
            })
            .state('login', {
                url : '/dangnhap',
                templateUrl : 'app/components/login/loginView.html',
                ncyBreadcrumb: {
                    label: 'ĐĂNG NHẬP'
                }
            })
            .state('register', {
                url : '/dangky',
                templateUrl : 'app/components/register/registerView.html',
                ncyBreadcrumb: {
                    label: 'ĐĂNG KÝ'
                }
            });
    });
}());