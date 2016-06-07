(function () {
	var app = angular.module('movieApp');

	app.run(function (blockUI, $cookies, $interval, $rootScope) {
		if ($cookies.getObject('user') == undefined)
		{
			blockUI.start("You are not log in!");
			console.log('not loggin');
		}
		else if ($cookies.getObject('user').accountInfo.role != 'ADMIN')
		{
			blockUI.start("You are not an Admin!");
			console.log('not admin');
		}
		else console.log('valid cookie');

		$interval(function () {
			console.log('check cookie')
			if ($cookies.getObject('user') == undefined)
			{
				blockUI.start("You are not log in!");
				console.log('not loggin');
			}
			else if ($cookies.getObject('user').accountInfo.role != 'ADMIN')
			{
				blockUI.start("You are not an Admin!");
				console.log('not admin');
			}
			else
			{ 
				console.log('valid cookie');
				blockUI.stop();
			}
			$rootScope.$evalAsync();
		},5000);

	});
})();