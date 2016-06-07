/**
 * Created by Administrator on 31/05/2016.
 */
 (function(){
    var app = angular.module('movieApp');
    app.directive('starRating',
        function($rootScope,Notification) {
            return {
                restrict : 'A',
                templateUrl : 'app/shared/starrating/starratingView.html',
                scope : {
                    ratingValue : '=',
                    max : '=',
                    onRatingSelected : '&'
                },
                link : function(scope, elem, attrs) {

                    scope.canUpdate = false;
                    scope.defaultValue = scope.ratingValue;
                    scope.finalRating = scope.ratingValue;

                    var updateStars = function() {
                        scope.stars = [];
                        for ( var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled : i < scope.ratingValue
                            });
                        }
                    };


                    scope.toggle = function(index) {
                        if($rootScope.globals.accountInfo.role === 'GUESS')
                        {
                            Notification.error('Bạn không được phép đánh giá');
                        }
                        else{
                            scope.ratingValue = index + 1;
                            scope.onRatingSelected({
                                rating : index + 1
                            });
                            scope.finalRating = scope.ratingValue;
                            canUpdate = true;
                        }
                    };

                    scope.over = function(index){
                        scope.ratingValue = index + 1;
                        canUpdate = false;
                    }

                    scope.leave = function(){
                        if(canUpdate == false)
                        {
                            scope.ratingValue = scope.defaultValue;
                        }
                        scope.ratingValue = scope.finalRating;
                    }

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