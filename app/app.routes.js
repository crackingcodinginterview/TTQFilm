/**
 * Created by Administrator on 30/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/dangnhap");
        $stateProvider
            .state('home', {
                url : "/trangchu",
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
                    label: 'ĐĂNG NHẬP'
                },
                views : {
                    'subview1' : {
                        template : '<div ncy-breadcrumb></div>',
                    },
                    'subview2' : {
                        templateUrl : 'app/components/login/loginView.html'
                    }
                }
            })
            .state('register', {
                url : '/dangky',
                ncyBreadcrumb: {
                    label: 'ĐĂNG KÝ'
                },
                views : {
                    'subview1' : {
                        template : '<div ncy-breadcrumb></div>',
                    },
                    'subview2' : {
                        templateUrl : 'app/components/register/registerView.html'
                    }
                }
            });
    });
}());