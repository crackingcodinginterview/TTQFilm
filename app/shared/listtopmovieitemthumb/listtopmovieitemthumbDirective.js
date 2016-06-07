/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.directive('listTopMovieItemThumb', function(){
       return {
           restrict : 'E',
           templateUrl : 'app/shared/listtopmovieitemthumb/listtopmovieitemthumbView.html',
           scope : {
              filmShow: '=',
           },
           link : function(scope, element, attributes){
               scope.ratingValueConverted = Math.floor(parseFloat(scope.filmShow.Views) / 2);
           }
       }
    });
}());