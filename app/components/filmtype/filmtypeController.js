(function(){
	var app = angular.module('movieApp');

	app.filter('offset', function() {
		return function(input, start) {
			return input.slice(start);
		};
	})

	app.controller('FilmTypeController',function($scope, $state, $filter){
		$scope.listfilm = {};

		$scope.listfilm = $state.params.listfilm;


		if($scope.listfilm == null)
		{
			$state.go('app');
		}
		
		$scope.type = $state.params.typename;

		$scope.currentPage = 1;
    	$scope.itemsPerPage = 15;
    	$scope.totalItems = $scope.listfilm.length;


		// console.log($scope.listcartoonfilm);

	});

}());