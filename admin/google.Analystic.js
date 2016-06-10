(function(w,d,s,g,js,fs){
	g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
	js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
	js.src='https://apis.google.com/js/platform.js';
	fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
}(window,document,'script'));

gapi.analytics.ready(function() {

	var CLIENT_ID = '310847899228-k2i6ikqimo60t23fq32inu10qnmuujmh.apps.googleusercontent.com';

	gapi.analytics.auth.authorize({
		container: 'auth-button',
		clientid: CLIENT_ID,
	});


	var viewSelector = new gapi.analytics.ViewSelector({
		container: 'view-selector'
	});


	var timeline = new gapi.analytics.googleCharts.DataChart({
		reportType: 'ga',
		query: {
			'dimensions': 'ga:date',
			'metrics': 'ga:sessions',
			'start-date': '5daysAgo',
			'end-date': 'today',
		},
		chart: {
			type: 'LINE',
			container: 'timeline'
		}
	});


	gapi.analytics.auth.on('success', function(response) {
		viewSelector.execute();
	});

	viewSelector.on('change', function(ids) {
		var newIds = {
			query: {
				ids: ids
			}
		}
		timeline.set(newIds).execute();
	});
});