(function () {
	var app = angular.module('movieApp');

	app.factory('storageService', function(){
		var service = {};
		service.uploadFile = uploadFile;
		return service;

		function uploadFile(scope, type, file) {
			var storageRef = firebase.storage().ref();
			var Task = storageRef.child(type + "/" + file.name).put(file);

			Task.on('state_changed', function(snapshot){
				scope.$emit('updateUploadProgress' + file.name, {progress: (snapshot.b/snapshot.h)*100});
			}, function(error) {
				console.log(error);
			}, function() {
				console.log(Task.snapshot.downloadURL);
				scope.$emit('uploadDone' + file.name, {url: Task.snapshot.downloadURL});
			});
		}
		
	})
}());