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
              filmShow: '='
           },
           link : function(scope, element, attributes){
              //scope.$watch('filmShow', function(newValue, oldValue, scope) {
               // $(element).on('mouseenter', function(e) {
               //      console.log(e.clientX, e.clientY);
               //     $(this).find('.list-top-movie-item__tool-tip').css(
               //         {
               //             'display' : 'inline-block',
               //             'top' : e.clientY,
               //             'left' : e.clientX
               //         }
               //     );
               // });
           }
       }
    });
}());