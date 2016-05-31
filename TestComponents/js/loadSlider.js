$(window).load(function() {
	$('#main-slider').flexslider({
		animation: "fade",
		animationLoop: true,
		itemMargin: 5,
		animationSpeed: 1000,
    	controlNav: false,
		controlsContainer: '.flex-container'
	});

	$('#secondary-slider').flexslider({
		animation: "slide",
		animationLoop: true, 
		itemWidth: 210,
		controlNav: false,
		itemMargin: 5,
		controlsContainer: '.flex-container'
	});
});