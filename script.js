var apikey;

$.getJSON("https://www.googleapis.com/youtube/v3/activities?part=snippet&mine=true&key=" + apikey).done(function(data) {
	console.log(data);
});