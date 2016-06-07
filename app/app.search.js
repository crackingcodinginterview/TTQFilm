(function(){
    var app = angular.module('movieApp');

    app.controller('SearchController', function($scope,FilmService){

        $scope.Find = function(){
            $scope.filmresult = FilmService.SearchFilm($scope.query);
        }


    });
}());