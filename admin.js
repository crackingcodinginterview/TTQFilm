/**
* mainApp Module
*
* Description
*/

var config = {
	apiKey: "AIzaSyABmwpvdLmJDqdkZF7F7pVFsANqfF48qR4",
	authDomain: "dack-ptudw-be6ac.firebaseapp.com",
	databaseURL: "https://dack-ptudw-be6ac.firebaseio.com",
	storageBucket: "dack-ptudw-be6ac.appspot.com",
};
firebase.initializeApp(config);

var app = angular.module('mainApp', ['ngFx', 'ngAnimate', 'firebase']);

app.controller('mainCtr', ['$scope', '$firebaseObject', '$timeout', '$filter', function($scope, $firebaseObject, $timeout, $filter){
	window.sc = $scope;
	sc.user = {};

	var ref = firebase.database().ref().child("user");
	var userObject = $firebaseObject(ref);

	userObject.$bindTo($scope, "user");

	userObject.$loaded().then(function () {
		console.log("Load done");
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

	

	sc.uploadFilm = function () {
		sc.upload(sc.Upload.file);
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

}])

app.directive('customOnChange', function() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.customOnChange);
			element.bind('change', onChangeHandler);
		}
	};
});
