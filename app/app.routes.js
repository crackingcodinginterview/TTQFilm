/**
 * Created by Administrator on 30/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('app', {
                url : "/",
                ncyBreadcrumb: {
                    label: 'PHIM MỚI',
                },
                views : {
                    'subview2' : {
                        templateUrl : 'app/components/home/homeView.html',
                    },
                    'subview3' : {
                        templateUrl : 'app/shared/sidebar/sidebarView.html'
                    },
                    'subview4' : {
                        templateUrl : 'app/components/headeruser/headeruserView.html'
                    }
                },
                data : { pageTitle: 'PHIM MỚI' }
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
                        templateUrl : 'app/components/register/registerView.html'
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
                        templateUrl : 'app/components/changepassword/changepasswordView.html'
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
    })
    app.run([ '$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
            // $rootScope.$state = $state;
            // $rootScope.$stateParams = $stateParams;
            // console.log('test');
            $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                console.log('test');
                // if (principal.isIdentityResolved()) authorization.authorize();
            });
        }]);
}());