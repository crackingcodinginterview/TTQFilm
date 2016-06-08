(function () {
	var app = angular.module('movieApp');
	app.factory('FilmService', function($firebaseObject, $firebaseArray,localStorageService, $rootScope){
		var service = {};
		service.getFilms = getFilms;
		service.getActionFilms = getActionFilms;
		service.getCartoonFilms = getCartoonFilms;
		service.getDramaFilms = getDramaFilms;
		service.getFunnyFilms = getFunnyFilms;
		service.getSeriesFilms = getSeriesFilms;

		service.SearchFilm = SearchFilm;
		service.getCurrentFilm = getCurrentFilm;
		service.setCurrentFilm = setCurrentFilm;
		service.getLastCurrentFilm = getLastCurrentFilm;

		service.convertURL = convertURL;

		return service;
		//get all films
		function getFilms(){
			var listFilmsRef = firebase.database().ref();
			return $firebaseObject(listFilmsRef.child("FilmsList"));
		}

		//get 15 action films
		function getActionFilms(){
			var result = [];
      		var FilmsRef = firebase.database().ref().child("FilmsList").child("Type").child("Action");
      		FilmsRef.orderByPriority().limitToLast(15).on("child_added",function(snapshot){
      			result.push(snapshot.val());
      		});
      		return result;
		}

		//get 15 cartoon films
		function getCartoonFilms(){
			var result = [];
      		var FilmsRef = firebase.database().ref().child("FilmsList").child("Type").child("Cartoon");
      		FilmsRef.orderByPriority().limitToLast(15).on("child_added",function(snapshot){
      			result.push(snapshot.val());
      		});
      		return result;
		}

		//get 10 films
		function getDramaFilms(){
			var result = [];
      		var FilmsRef = firebase.database().ref().child("FilmsList").child("Type").child("Drama");
      		FilmsRef.orderByPriority().limitToLast(10).on("child_added",function(snapshot){
      			result.push(snapshot.val());
      		});
      		return result;
		}

		function getFunnyFilms(){
			var result = [];
      		var FilmsRef = firebase.database().ref().child("FilmsList").child("Type").child("Funny");
      		FilmsRef.orderByPriority().limitToLast(10).on("child_added",function(snapshot){
      			result.push(snapshot.val());
      		});
      		return result;
		}		

		function getSeriesFilms(){
			var result = [];
      		var FilmsRef = firebase.database().ref().child("FilmsList").child("Series");
      		FilmsRef.orderByPriority().limitToLast(10).on("child_added",function(snapshot){
      			result.push(snapshot.val());
      		});
      		return result;
		}

		//set film in type action by Name_En
		function SearchFilm(query)
		{
			var ref = firebase.database().ref().child("FilmsList").child("Type").child("Action");
			//var films = $firebaseArray(ref);
			//return films;
			ref.orderByChild("Name_En").equalTo(query).on("child_added", function(snapshot) {
  				console.log(snapshot.val());
  			})
			//console.log(films);
		}

		function setCurrentFilm(film){
			localStorageService.set('currentFilm',film);
			$rootScope.globals.currentFilm = film;
		}

		function getCurrentFilm(){
			return $rootScope.globals.currentFilm;
		}

		function getLastCurrentFilm(){
			$rootScope.globals.currentFilm = localStorageService.get('currentFilm');
		}

		function convertURL(name){
			//Đổi chữ hoa thành chữ thường
                var slug = name.toLowerCase();
 
                //Đổi ký tự có dấu thành không dấu
                slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
                slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
                slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
                slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
                slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
                slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
                slug = slug.replace(/đ/gi, 'd');
                //Xóa các ký tự đặt biệt
                slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
                //Đổi khoảng trắng thành ký tự gạch ngang
                slug = slug.replace(/ /gi, "-");
                //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
                //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
                slug = slug.replace(/\-\-\-\-\-/gi, '-');
                slug = slug.replace(/\-\-\-\-/gi, '-');
                slug = slug.replace(/\-\-\-/gi, '-');
                slug = slug.replace(/\-\-/gi, '-');
                //Xóa các ký tự gạch ngang ở đầu và cuối
                slug = '@' + slug + '@';
                slug = slug.replace(/\@\-|\-\@|\@/gi, '');
                //In slug ra textbox có id “slug”
                return slug;
		}

	});
}());