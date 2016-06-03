/**
 * Created by Administrator on 30/05/2016.
 */
 (function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('app', {
            url : '/',
            ncyBreadcrumb: {
                label: 'PHIM MỚI',
            },
            views : {
                'subview2' : {
                    templateUrl : 'app/components/home/homeView.html',
                    controller : 'ListFilmController'
                },
                'subview3' : {
                    templateUrl : 'app/shared/sidebar/sidebarView.html'
                },
                'subview4' : {
                    templateUrl : 'app/components/headeruser/headeruserView.html',
                    controller : 'headeruserController'
                }
            },
            data : { pageTitle: 'PHIM MỚI' }
        })
            //State Xem phim
            .state('app.watchfilm',{
                url:'xemphim/:id',
                // params: {
                //     phimdetail: null
                // },
                ncyBreadcrumb:{
                    label: 'XEM PHIM'
                },
                views : {
                    'subview1@' : {
                        template: '<ncy-breadcrumb></ncy-breadcrumb>'
                    },
                    'subview2@' : {
                        templateUrl: 'app/components/watchfilm/watchfilmView.html',
                        controller: 'watchfilmController'

                    }
                },
                data : { pageTitle: 'XEM PHIM' }
            })

            .state('app.login', {
                url : 'dangnhap',
                ncyBreadcrumb: {
                    label: 'ĐĂNG NHẬP',
                },
                views : {
                    'subview1@' : {
                        template : '<div ncy-breadcrumb></div>',
                    },
                    'subview2@' : {
                        templateUrl : 'app/components/login/loginView.html',
                        controller : 'loginController'
                    }
                },
                data : { pageTitle: 'ĐĂNG NHẬP' }
            })
            .state('app.register', {
                url : 'dangky',
                ncyBreadcrumb: {
                    label: 'ĐĂNG KÝ'
                },
                views : {
                    'subview1@' : {
                        template : '<ncy-breadcrumb></ncy-breadcrumb>',
                    },
                    'subview2@' : {
                        templateUrl : 'app/components/register/registerView.html',
                        controller : 'registerController'
                    }
                },
                data : { pageTitle: 'ĐĂNG KÝ' }
            })
            .state('app.changepassword', {
                url : 'doimatkhau',
                ncyBreadcrumb: {
                    label: 'ĐỔI MẬT KHẨU'
                },
                views : {
                    'subview1@' : {
                        template : '<ncy-breadcrumb></ncy-breadcrumb>',
                    },
                    'subview2@' : {
                        templateUrl : 'app/components/changepassword/changepasswordView.html',
                        controller : 'changepasswordController'
                    }
                },
                data : { pageTitle: 'ĐỔI MẬT KHẨU' }
            })
            .state('app.forgotpassword', {
                url : 'laymatkhaumoi',
                ncyBreadcrumb: {
                    label: 'QUÊN MẬT KHẨU'
                },
                views : {
                    'subview1@' : {
                        template : '<ncy-breadcrumb></ncy-breadcrumb>',
                    },
                    'subview2@' : {
                        templateUrl : 'app/components/forgotpassword/forgotpasswordView.html'
                    }
                },
                data : { pageTitle: 'QUÊN MẬT KHẨU' }
            });
        });
    app.run(function ($rootScope, $state, $stateParams, $cookies) {
        firebase.auth().onAuthStateChanged(function(response){
         $rootScope.globals = {
             currentUser : response,
         };
         $rootScope.$apply();
     });
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
        });
    });
}());