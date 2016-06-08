/**
 * Created by Administrator on 08/06/2016.
 */
(function(){
    var app  = angular.module('movieApp');
    app.service('GoogleAnalyticService', function($window){
        var service = {};
        service.init = init;
        service.send = send;
        return service;

        function init(){
            $window.ga('create', 'UA-78955508-1', 'auto');
        };
        function send(packet){
            $window.ga('send', packet);
        };
    });
}());