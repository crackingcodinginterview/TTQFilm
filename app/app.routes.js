/**
 * Created by Administrator on 30/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url : "/",
                ncyBreadcrumb: {
                    label: 'TRANG CHỦ'
                },

                views : {
                    'subview1' : {

                    },
                    'subview2' : {
                        templateUrl : 'app/components/home/homeView.html'
                    }
                }
            })
            .state('login', {
                url : '/dangnhap',
                ncyBreadcrumb: {
                    label: 'ĐĂNG NHẬP',
                    parent : 'home'
                },
                views : {
                    'subview1' : {
                        template : '<div ncy-breadcrumb></div>',
                    },
                    'subview2' : {
                        templateUrl : 'app/components/login/loginView.html',
                        controller : 'loginController'
                    }
                }
            })
            .state('register', {
                url : '/dangky',
                ncyBreadcrumb: {
                    parent : 'home',
                    label: 'ĐĂNG KÝ'
                },
                views : {
                    'subview1' : {
                        template : '<ncy-breadcrumb></ncy-breadcrumb>',
                    },
                    'subview2' : {
                        templateUrl : 'app/components/register/registerView.html'
                    }
                }
            });
    });
}());