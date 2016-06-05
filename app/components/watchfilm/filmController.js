(function(){
	var app = angular.module('movieApp');

	app.controller('filmController', function($state,$scope){
		$scope.film = {};

		$scope.film = $state.params.filminfo;

		$state.get('app.filmwatching').data.pageTitle = "Xem phim " + $scope.film.Name_Vi;

		$scope.ReadMore = function(){
			$state.go('app.watchfilm',{filmdetail : $scope.film});
		}
	});

	app.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);
        
}());