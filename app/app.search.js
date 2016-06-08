(function(){
    var app = angular.module('movieApp');

    app.controller('SearchController', function($scope,FilmService,$state){

        $scope.Find = function(){
            $scope.result = FilmService.SearchFilm($scope.query);
            
            $state.go('app.filmtype',{listfilm : $scope.result, typename: 'Kết Quả', filmtypename: FilmService.convertURL('ket-qua-tim-kiem')});
            // });
        }
    });
}());