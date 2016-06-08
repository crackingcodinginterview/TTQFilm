(function(){
	var app = angular.module('movieApp');

	app.controller('filmController', function($state,$scope,$log,$sce,FilmService, GoogleAnalyticService){



		$scope.film = {};


		$scope.film = $state.params.filminfo;

		$scope.filmLink = $state.href($state.current.name, $state.params, {absolute: true});

		if($scope.film == null){
			$scope.film = FilmService.getCurrentFilm();
		}

		FilmService.setCurrentFilm($scope.film);

		GoogleAnalyticService.send({
			hitType: 'event',
			eventCategory: 'Film Watching',
			eventAction: $scope.film.Name_Vi,
			eventLabel: 'Phim Moi'
		});


		$state.get('app.filmwatching').data.pageTitle = $scope.film.Name_Vi.toUpperCase();

		$scope.ReadMore = function(){
			$state.go('app.watchfilm',{filmdetail : $scope.film});
		};

		$scope.options = {
			type: 'mp4',
			title: $scope.film.Name_Vi
		};

		$scope.videoSrc = $sce.trustAsResourceUrl($scope.film.Source);
		console.log("On Play");
		// // Optional: Catch ng-jwplayer event for when JWPlayer is ready               
		// $scope.$on('ng-jwplayer-ready', function(event, args) {
		// 	$log.info('Player ' + args.playerId + ' ready. Playing video');
		// 	var player = jwplayerService.myPlayer[args.playerId];
		// 	player.play(true);
		// });
	});
}());