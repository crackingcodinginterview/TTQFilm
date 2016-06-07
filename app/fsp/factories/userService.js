/**
 * Created by Administrator on 02/06/2016.
 */
(function() {
    var app = angular.module('movieApp');
    app.factory('UserService', function (DatabaseService, $firebaseObject) {
        var service = {};
        service.signInWithEmailAndPassword = signInWithEmailAndPassword;
        service.signInWithFacebook = signInWithFacebook;
        service.signOut = signOut;
        service.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
        service.updatePassword = updatePassword;
        return service;

        function getUserRole(uid){
            var ref = firebase.database().ref('user').child(uid);
            var userRef = $firebaseObject(ref);
            return userRef.$loaded().then(
                function(response){
                    return response;
                }
            );
        };
        function signInWithEmailAndPassword(user) {
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
                function (response) {
                    return getUserRole(response.uid).then(
                        function (response1) {
                            return {
                                success: true,
                                message: 'Đăng nhập thành công.',
                                accountInfo: {
                                    type: 'EMAIL',
                                    role: response1.role.toUpperCase(),
                                    info: {
                                        displayName: response1.name,
                                        email: user.email,
                                        password: user.password
                                    }
                                }
                            };
                        }
                    )
                },
                function (response) {
                    var message = '';
                    switch (response.code) {
                        case 'auth/invalid-email':
                            message = 'Email không hợp lệ.';
                            break;

                        case 'auth/user-disabled':
                            message = 'Tài khoản của bạn chưa được kích hoạt.';
                            break;

                        case 'auth/user-not-found':
                            message = 'Không tìm thấy tài khoản này.';
                            break;

                        case 'auth/wrong-password':
                            message = 'Mật khẩu không đúng.';
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
                    return {
                        success: true,
                        message: 'Đăng nhập thành công.',
                        accountInfo: {
                            type: 'FACEBOOK',
                            role: 'USER',
                            info: {
                                displayName: response.user.displayName,
                            }
                        }
                    };
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
                    DatabaseService.createUserDatabase(response, user.name, "user");
                    return {success: true, message: 'Đăng kí tài khoản thành công.'};
                },
                function (response) {
                    var message = '';
                    switch (response.code) {
                        case 'auth/email-already-in-use':
                            message = 'Email này đã được sử dụng.';
                            break;

                        case 'auth/weak-password':
                            message = 'Mật khẩu không đủ mạnh';
                            break;

                        case 'auth/invalid-email':
                            message = 'Email không hợp lệ';
                            break;

                        case 'auth/operation-not-allowed':
                            message = 'Tài khoản của bạn chưa được kích hoạt';
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
        }
    });
}());



// return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
//     function(response){
//     currentUser.updatePassword(newPassword).then(
//
//         function(error){
//             var message = '';
//             switch (error.code){
//                 case 'auth/weak-password':
//                     message  = 'Mật khẩu quá yếu.';
//                     break;
//
//                 case 'auth/requires-recent-login':
//                     message = 'Vui lòng đăng nhập lại.';
//                     break;
//
//                 default:
//                     message = 'Vui lòng kiểm tra lại đường truyền.';
//                     break;
//             }
//             return {success : false, message : message};
//         }
//     ),