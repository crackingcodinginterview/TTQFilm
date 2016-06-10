(function () {
	var app = angular.module('movieApp');

	app.run(function (blockUI, $cookies, $interval, $rootScope) {
		$rootScope.global = {};
		$rootScope.global.messageNotAdmin = "You are not an Admin!";
		$rootScope.global.messageNotLogin = "You are not Login!";

		if ($cookies.getObject('user') == undefined)
		{
			blockUI.start($rootScope.global.messageNotLogin);
			$rootScope.global.stage = "notadmin";
			console.log('not loggin');
		}
		else if ($cookies.getObject('user').accountInfo.role != 'ADMIN')
		{
			blockUI.start($rootScope.global.messageNotAdmin);
			$rootScope.global.stage = "notadmin";
			console.log('not admin');
		}
		else 
		{
			console.log('valid cookie');
			$rootScope.global.stage = "admin";
		}
	});
})();