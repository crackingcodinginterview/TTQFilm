(function(){
	angular.module('movieApp').directive('sliderActor', function(){
	// Runs during compile
	return {
		   restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		   templateUrl: 'app/shared/loadslider/loadsliderActor.html',
		   scope: {
		   	animationType : '@',
		   	listActor : '=',
		   },

		   link: function(scope, iElm, iAttrs) {

		   	scope.$watch('listActor', function(newValue, oldValue) {
		   		$('.flexslider').flexslider({
		   			animation: scope.animationType,
		   			animationLoop: true,
		   			itemWidth: 125,
		   			animationSpeed: 1200,
		   			controlNav: false,
		   			itemMargin: 5,
		   		});
		   	});	
		   }
		};
	});
}());