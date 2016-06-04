/**
 * Created by Administrator on 02/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('UserService', function(DatabaseService){
        var service = {};
        service.login = login;
        service.loginWithFacebook = loginWithFacebook;
        service.logout = logout;
        service.createUser = createUser;
        service.updatePassword = updatePassword;
        return service;

        function login(user){
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
                function(response){
                    return {success : true, message : 'Đăng nhập thành công.'};
                },
                function(response){
                    var message = '';
                    switch (response.code){
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
                    return {success : false, message : message};
                }
            )
        };
        function loginWithFacebook(){
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider);
            return firebase.auth().getRedirectResult().then(
                function(response) {
                    return {success : true, message  : 'Đăng nhập thành công.'};
                },
                function(response){
                    return {success : false, message : 'Có lỗi xảy ra.'};
                }
            );
        };
        function logout(){
            return firebase.auth().signOut().then(
                function(){
                    return {success : true, message : 'Đăng xuất thành công.'}
                },
                function(error){
                    return {success : false, message : 'Vui lòng kiểm tra lại đường truyền.'}
                }
            );
        }
        function createUser(user){
            return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                function(response){
                    response.updateProfile({displayName: user.name});
                    console.log(response);
                    DatabaseService.createUserDatabase(response, user.name, "user");
                    return {success : true, message : 'Đăng kí tài khoản thành công.'};
                },
                function(response){
                    var message = '';
                    switch (response.code){
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
                    return {success : false, message : message};
                }
            );
        };
        function updatePassword(currentUser, newPassword){
            return currentUser.updatePassword(newPassword).then(
                function(){
                    return {success : true, message : 'Đổi mật khẩu thành công'};
                },
                function(error){
                    var message = '';
                    switch (error.code){
                        case 'auth/weak-password':
                            message  = 'Mật khẩu quá yếu.';
                            break;

                        case 'auth/requires-recent-login':
                            message = 'Vui lòng đăng nhập lại.';
                            break;

                        default:
                            message = 'Vui lòng kiểm tra lại đường truyền.';
                            break;
                    }
                    return {success : false, message : message};
                }
            )
        };
    });
}());