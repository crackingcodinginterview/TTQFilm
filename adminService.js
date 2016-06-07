(function () {
	var app = angular.module('movieApp');
	app.factory('AdminService', function(){
		var service = {};
		service.prepairElements = prepairElements;
		service.checkValidData = checkValidData;
		return service;

		function prepairElements() {
			$('select').material_select();
			$('.datepicker').pickadate({
				selectMonths: true, 
				selectYears: 15 
			});
			Materialize.updateTextFields();
		}

		function checkValidData(data) {
			return (data.Name)
		}
	})
})();