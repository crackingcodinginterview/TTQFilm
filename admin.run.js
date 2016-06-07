(function () {
	var app = angular.module('movieApp');

	app.run(function (blockUI, $cookies) {
		if ($cookies.getObject('user') == undefined)
		{
			blockUI.start("You are not log in!");
			console.log('not loggin');
		}
		else
			if ($cookies.getObject('user').accountInfo.role != 'ADMIN')
			{
				blockUI.start("You are not an Admin!");
				console.log('not admin');
			}
		});
})();