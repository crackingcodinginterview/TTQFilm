(function () {
	var app = angular.module('movieApp');
	app.factory('AdminService', function($rootScope){
		var service = {};
		service.prepairElements = prepairElements;
		service.checkValidData = checkValidData;
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

		function checkValidData(data) {
			return (data.Name)
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