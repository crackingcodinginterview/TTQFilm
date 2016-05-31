/**
 * Created by Administrator on 31/05/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.directive('starRating',
        function() {
            return {
                restrict : 'A',
                templateUrl : 'app/shared/starrating/starratingView.html',
                scope : {
                    ratingValue : '=',
                    max : '=',
                    onRatingSelected : '&'
                },
                link : function(scope, elem, attrs) {
                    var updateStars = function() {
                        scope.stars = [];
                        for ( var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled : i < scope.ratingValue
                            });
                        }
                    };

                    scope.toggle = function(index) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({
                            rating : index + 1
                        });
                    };

                    scope.$watch('ratingValue',
                        function(oldVal, newVal) {
                            if (newVal) {
                                updateStars();
                            }
                        }
                    );
                }
            };
        }
    );
}());