/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.controller('loginController', function($scope, Notification){
        $scope.test = function(){
            Notification.success('Success notification');
        };
    });
}());