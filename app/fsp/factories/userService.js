/**
 * Created by Administrator on 02/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.factory('UserService', function($firebaseObject){
        var service = {};
        service.login = login;
        service.createUser = createUser;
        service.deleteUser = deleteUser;
        service.updateUser = updateUser;
        return service;

        function login(user){
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
                function(response){
                    console.log(firebase.auth().currentUser);
                    return {success : true, message : 'Đăng nhập thành công'};
                },
                function(response){
                    return {success : false, message : 'Tài khoản hoặc mật khẩu không đúng'};
                }
            )
        };
        function createUser(user){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                function(response){
                    console.log('ok');
                },
                function(response){
                    console.log('lỗi');
                }
            );
        };
        function deleteUser(){

        };
        function updateUser(){

        };
    });
}());