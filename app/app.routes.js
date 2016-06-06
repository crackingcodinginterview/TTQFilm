/**
 * Created by Administrator on 30/05/2016.
 */
 (function(){
    var app = angular.module('movieApp');
    app.config(function($stateProvider, $urlRouterProvider){
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
            data : {
                pageTitle: 'Phim mới | Phim hay | Xem phim nhanh',
                role : ['GUESS', 'USER', 'ADMIN'],
            }
        })

            //State hiển thị phim của các loại
            .state('app.filmtype',{
                url:'theloai/{filmtype}',
                params: {
                    listfilm : null
                },
                views : {
                    'subview2@':{
                        templateUrl: 'app/components/filmtype/filmtypeView.html',
                        controller: 'filmtypeController'
                    }
                },
                data:{
                    pageTitle: 'Thể loại',
                    role: ['GUESS','USER','ADMIN'],
                }
            })

            //State xem thông tin chi tiết của phim
            .state('app.watchfilm',{
                url:'xemphim',
                params: {
                    filmdetail: null
                },
                ncyBreadcrumb:{
                    label: '{{film.Name_Vi}}'
                },
                views : {
                    'subview1@' : {
                        template: '<ncy-breadcrumb></ncy-breadcrumb>',
                        controller: 'watchfilmController'
                    },
                    'subview2@' : {
                        templateUrl: 'app/components/watchfilm/watchfilmView.html',
                        controller: 'watchfilmController'
                    }
                },
                data : {
                    pageTitle: 'XEM PHIM',
                    role : ['GUESS', 'USER', 'ADMIN'],
                }
            })

            //State xem phim
            .state('app.filmwatching',{
                url:'xemphim/{filmname}',
                params:{
                    filminfo: null
                },
                ncyBreadcrumb:{
                    label: '{{film.Name_Vi}} / XEM PHIM'
                },
                views : {
                    'subview1@' : {
                        template: '<ncy-breadcrumb></ncy-breadcrumb>',
                        controller: 'filmController'
                    },
                    'subview2@' : {
                        templateUrl: 'app/components/watchfilm/filmView.html',
                        controller: 'filmController'
                    }
                },
                data : {
                    pageTitle: 'XEM PHIM',
                    role : ['GUESS', 'USER', 'ADMIN'],
                }
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
                data : {
                    pageTitle: 'ĐĂNG NHẬP',
                    role : ['GUESS'],
                }
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
                data : {
                    pageTitle: 'ĐĂNG KÝ',
                    role : ['GUESS'],
                }
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
                data : {
                    pageTitle: 'ĐỔI MẬT KHẨU',
                    role : ['USER', 'ADMIN'],
                }
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
                data : {
                    pageTitle: 'QUÊN MẬT KHẨU',
                    role : ['GUESS'],
                }
            })
            .state('app.accessdenied', {
                url : 'trangblock',
                ncyBreadcrumb: {
                    label: 'CẢNH BÁO'
                },
                views : {
                    'subview1@' : {
                        template : '<ncy-breadcrumb></ncy-breadcrumb>',
                    },
                    'subview2@' : {
                        templateUrl : 'app/components/accessdenied/accessdeniedView.html'
                    }
                },
                data : {
                    pageTitle: 'CẢNH BÁO',
                    role : ['GUESS', 'USER', 'ADMIN'],
                }
            });
        });
app.run(function ($rootScope, $state, $stateParams, AuthenticationService) {
   $rootScope.globals = {};
   AuthenticationService.waitForUser();
   firebase.auth().onAuthStateChanged(function(response){
       AuthenticationService.setCredential(response);
   });
   $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
       $rootScope.toState = toState;
       $rootScope.toStateParams = toStateParams;
       if ($rootScope.globals.role !== undefined) {
           AuthenticationService.authorize();
       }
   });
});
}());