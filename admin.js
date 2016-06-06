(function () {
	
	var app = angular.module('mainApp');

	app.controller('mainCtr', function($scope, $firebaseObject, $timeout, $filter, storageService){
		window.sc = $scope;
		sc.user = {};
		sc.isUsersLoaded = false;

		var ref = firebase.database().ref().child("user");
		var userObject = $firebaseObject(ref);

		userObject.$bindTo($scope, "user");

		userObject.$loaded().then(function () {
			console.log("Load done");
			sc.isUsersLoaded = true;
			sc.refreshList();
		});

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log(user);
				sc.user = user;
			} else {
				console.log("Sign out!");
			}
		});

		sc.coverArray = function () {
			return Object.keys(userObject).map(function (key) {return userObject[key]});
		}

		sc.refreshList = function () {
			sc.userList = sc.coverArray();
			sc.$evalAsync();
		}

		ref.on("value", function (snapshot) {
			console.log("Data changed!");
			console.log(userObject);
			console.log(sc.user)
			console.log(snapshot);
			$timeout(function() {
				sc.refreshList();
				console.log('update with timeout fired')
			}, 100);

		})

		sc.search = {};

		$scope.getMyCtrlScope = function() {
			return $scope;   
		}

		sc.SelectedUser = [];

		sc.Check = function (user, value) {
			if (value === true)
				sc.SelectedUser.push(user);
			else
				sc.removeUserFromList(user, sc.SelectedUser);
		}

		sc.removeUserFromList = function (user, List) {
			var index = List.indexOf(user);
			if (index != -1) 
				List.splice(index, 1);
		}

		sc.Action = {};

		sc.changeAction = function (value, action) {
			if (value === true)
				sc.Action = action;
		}

		sc.doAction = function () {
			sc.Action();
		}

		sc.deleteUser = function () {
		//Todo
	}

	sc.changeToUser = function () {
		sc.changeTo('user');
	}

	sc.changeToAdmin = function () {
		sc.changeTo('admin');
	}

	sc.changeTo = function (role) {
		for (var i = sc.SelectedUser.length - 1; i >= 0; i--) {
			sc.changeUserRole(sc.SelectedUser[i], role)
		}
		sc.SelectedUser = [];
		sc.$evalAsync();
	}

	sc.changeUserRole = function (user, role) {
		var index = sc.userList.indexOf(user);
		if (index != -1)
		{
			sc.userList[index].role = role;
			ref.child(sc.userList[index].uid).update({role: role});
		}
	}

	sc.Upload = {};
	
	sc.uploadFile = function(event){
		var files = event.target.files;
		console.log(files);
		sc.Upload.file = files[0];
		sc.isReadyUpload = true;
		sc.$evalAsync();
	};

	sc.ts = storageService;

	sc.uploadFilm = function () {
		storageService.uploadFile($scope, 'films', sc.Upload.file);

		sc.$on('updateUploadProgress' + sc.Upload.file.name, function (event, data) {
			console.log(data);
			sc.MyStyle = {width: data.progress + '%'};
			sc.Status = "Uploading " + data.progress + '%';
			sc.$evalAsync();
		});

		sc.$on('uploadDone' + sc.Upload.file.name, function (event, data) {
			console.log('Done');
			sc.Status = "Upload Done!";
			sc.$evalAsync();
		});
	}

	sc.upload = function (file) {
		var storageRef = firebase.storage().ref();
		//storageRef.child(sc.Upload.file.name);

		sc.Status = "Prepairing...";
		var Task = storageRef.child('films/' + file.name).put(file)
		Task.on('state_changed', function(snapshot){
			console.log(snapshot)
			sc.MyStyle = {width: (snapshot.b/snapshot.h)*100 + '%'};
			sc.$evalAsync();
			console.log(sc.MyStyle);
			sc.Status = "Uploading..." + (snapshot.b/snapshot.h)*100 + '%';
		}, function(error) {
			console.log(error);
			sc.Status = "Upload Error";
		}, function() {
			console.log(Task.snapshot.downloadURL);
			sc.Status = "Done! Link: " + Task.snapshot.downloadURL;
		});
	}
	

	sc.MyStyle = {width: '0' + '%'};

});

	app.directive('customOnChange', function() {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var onChangeHandler = scope.$eval(attrs.customOnChange);
				element.bind('change', onChangeHandler);
			}
		};
	})


})();