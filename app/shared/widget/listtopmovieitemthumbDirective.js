/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.directive('listTopMovieItemThumb', function(){
       return {
           restrict : 'E',
           templateUrl : 'app/shared/widget/listtopmovieitemthumbView.html',
           scope : {

           },
           link : function(scope, element, attributes){
           }
       }
    });
}());