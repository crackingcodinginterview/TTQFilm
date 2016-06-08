(function () {
	var app = angular.module('movieApp');
	app.factory('AdminService', function($rootScope, $timeout){
		var service = {};
		service.prepairElements = prepairElements;
		service.updateMaterialElement = updateMaterialElement;
		service.checkValidData = checkValidData;
		service.updateSelect = updateSelect;
		service.updateSelectElements = updateSelectElements;
		// service.changeUserRole = changeUserRole;
		// service.blockUser = blockUser;
		// service.unblockUser = unblockUser;
		return service;

		function prepairElements() {
			$('select').material_select();
			$('.datepicker').pickadate({
				selectMonths: true, 
				selectYears: 15 
			});
			Materialize.updateTextFields();
		}

		function updateMaterialElement() {
			$timeout(function() {
				Materialize.updateTextFields();
				$('.materialize-textarea').trigger('autoresize');
			}, 100);
		}

		function updateSelectElements(data) {
			updateSelect('qualitySelect', data.Quality);
			updateSelect('languageSelect', data.Language);

			data.Types.forEach(function(e){
				$('#' + 'typesSelect '  + 'option[value=' + e.split(' ').join('-') + ']').prop('selected', true);
			});
			$('#typesSelect').material_select();
		}

		function updateSelect(selectID, value) {
			var element = $('#' + selectID);
			element.append($("<option></option>").attr("value",value).text(value));
			element.val(value);
			element.material_select();
		}

		function checkValidData(data) {
			if (data.Source == undefined)
				return {valid: false, message: "File source cannot be empty!"};
			if (data.Name_Vi == undefined || data.Name_En == undefined)
				return {valid: false, message: "Name cannot be empty!"};
			return {valid: true, message: "Valid data!"};
		}

		function blockUser(UserList) {
			for (var i = UserList.length - 1; i >= 0; i--) {
				sc.changeStatus(UserList[i], "BLOCKED")
			}
			UserList = [];
			sc.$evalAsync();
		}

		var changeStatus = function (user, status) {
			var index = sc.userList.indexOf(user);
			var ref = firebase.database().ref().child("user");
			if (index != -1)
			{
				sc.userList[index].status = status;
				ref.child(sc.userList[index].uid).update({status: status});
			}
		}

	})
})();