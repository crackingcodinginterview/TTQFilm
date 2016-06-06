(function(){
    var app = angular.module('movieApp');

    app.controller('SearchController', function($scope,FilmService){

        //var fObject = FilmService.getFilms();
        //$scope.film = [];
        // Load all film
        //fObject.$bindTo($scope, "allfilms");

        $scope.Find = function(){
            $scope.film = FilmService.SearchFilm($scope.query);


            //console.log($scope.searchfilm);
        }


    });
}());