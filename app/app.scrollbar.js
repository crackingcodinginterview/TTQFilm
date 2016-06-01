/**
 * Created by Administrator on 01/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.config(function (ScrollBarsProvider) {
        ScrollBarsProvider.defaults = {

            autoHideScrollbar: false,
            // setHeight: 500,
            // scrollInertia: 500,
            axis: 'y',
            advanced: {
                updateOnContentResize: true
            },
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            theme: 'dark'
        };
    });
}());