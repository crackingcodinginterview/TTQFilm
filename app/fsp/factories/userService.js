/**
 * Created by Administrator on 02/06/2016.
 */
(function() {
    var app = angular.module('movieApp');
    app.factory('UserService', function (DatabaseService) {
        var service = {};
        service.signInWithEmailAndPassword = signInWithEmailAndPassword;
        service.signInWithFacebook = signInWithFacebook;
        service.signOut = signOut;
        service.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
        service.updatePassword = updatePassword;
        return service;

        function signInWithEmailAndPassword(user) {
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
                function (response) {
                    return DatabaseService.getUser(response.uid).then(
                        function (response1) {
                            var res = {
                                accountInfo: {
                                    type: 'EMAIL',
                                    role: response1.role,
                                    info: {
                                        displayName: response1.name,
                                        email: user.email,
                                        password: user.password
                                    }
                                }
                            };
                            if (response1.status === 'ACTIVE') {
                                res.success = true;
                                res.message = 'Đăng nhập thành công.';
                            }
                            else {
                                res.success = false;
                                res.message = 'Tài khoản của bạn đang bị khóa.';
                            }
                            return res;
                        }
                    )
                },
                function (response) {
                    var message = '';
                    switch (response.code) {
                        case 'auth/user-not-found':
                            message = 'Không tìm thấy tài khoản này.';
                            break;

                        case 'auth/wrong-password':
                            message = 'Mật khẩu không đúng.';
                            break;

                        default :
                            message = 'Vui lòng kiểm tra lại đường truyền.';
                            break;
                    }
                    return {success: false, message: message};
                }
            )
        };
        function signInWithFacebook() {
            var provider = new firebase.auth.FacebookAuthProvider();
            return firebase.auth().signInWithPopup(provider).then(
                function (response) {
                    return DatabaseService.isUidExist(response.user.uid).then(
                        function (response1) {
                            if (!response1)
                                DatabaseService.createUserDatabase({
                                    uid: response.user.uid,
                                    email: response.user.email ? response.user.email : 'NONE',
                                    name: response.user.displayName,
                                    role: 'USER',
                                    status: 'ACTIVE'
                                });
                            return DatabaseService.getUser(response.user.uid).then(
                                function (response2) {
                                    var res = {
                                        accountInfo: {
                                            type: 'FACEBOOK',
                                            role: response2.role,
                                            info: {
                                                displayName: response2.name,
                                            }
                                        }
                                    };
                                    if (response2.status === 'ACTIVE') {
                                        res.success = true;
                                        res.message = 'Đăng nhập thành công.';
                                    }
                                    else {
                                        res.success = false;
                                        res.message = 'Tài khoản của bạn đang bị khóa.';
                                    }
                                    return res;
                                }
                            );
                        }
                    )

                },
                function (response) {
                    return {success: false, message: 'Có lỗi xảy ra.'};
                }
            );
        };
        function signOut() {
            return firebase.auth().signOut().then(
                function () {
                    return {success: true, message: 'Đăng xuất thành công.'}
                },
                function (error) {
                    return {success: false, message: 'Vui lòng kiểm tra lại đường truyền.'}
                }
            );
        }

        function createUserWithEmailAndPassword(user) {
            return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                function (response) {
                    response.updateProfile({displayName: user.name});
                    firebase.auth().signOut();
                    DatabaseService.createUserDatabase({
                        uid: response.uid,
                        name: user.name,
                        email: response.email,
                        role: 'USER',
                        status: 'ACTIVE'
                    });
                    return {success: true, message: 'Đăng kí tài khoản thành công.'};
                },
                function (response) {
                    var message = '';
                    switch (response.code) {
                        case 'auth/email-already-in-use':
                            message = 'Email này đã được sử dụng.';
                            break;

                        case 'auth/operation-not-allowed':
                            message = 'Tài khoản của bạn chưa được kích hoạt.';
                            break;

                        default:
                            message = 'Vui lòng kiểm tra lại đường truyền.';
                            break;
                    }
                    return {success: false, message: message};
                }
            );
        };
        function updatePassword(user, newPassword) {
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
                function(response){
                    return response.updatePassword(newPassword).then(
                        function(){
                            return {success : true, message : 'Đổi mật khẩu thành công.'};
                        },
                        function(error){
                            return {success : false, message : 'Vui lòng kiểm tra lại đường truyền.'};
                        }
                    )
                }
            );
        }
    });
}());



