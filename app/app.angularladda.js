/**
 * Created by Administrator on 01/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function (laddaProvider) {
        laddaProvider.setOption({ /* optional */
            style: 'expand-right',
            spinnerSize: 35,
            spinnerColor: '#ffffff'
        });
    })
}());