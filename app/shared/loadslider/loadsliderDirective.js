(function(){
	angular.module('movieApp').directive('loadSlider', function(){
	// Runs during compile
	return {
		   restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		   templateUrl: 'app/shared/loadslider/loadsliderView.html',
		   scope: {
		   	animationType : '@',
		   	listFilm : '=',
		   },

		   link: function(scope, iElm, iAttrs) {

		   	console.log(scope.animationType);
		   	scope.$watch('listFilm', function(newValue, oldValue) {
		   		$('.flexslider').flexslider({
		   			animation: scope.animationType,
		   			animationLoop: true,
		   			itemWidth: 210,
		   			animationSpeed: 1200,
		   			slideshowSpeed: 7000,
		   			controlNav: false,
		   			itemMargin: 5,
		   		});
		   	});	
		   }
		};
	});
}());