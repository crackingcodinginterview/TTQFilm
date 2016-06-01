/**
 * Created by Administrator on 01/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    });
}());