var echo = require('echonest');
var spotify = require('spotify');
var express = require('express');
var router = express.Router();

var spotifyIds = [];
var playlistDuration = 0;
var maxDuration;
var year_range;
var queryString = "http://developer.echonest.com/api/v4/song/search?api_key=JDAHBKZZ2Y9QVMEVO&format=json&results=100&artist=radiohead";
var myNest = new echo.Echonest({
    api_key: 'JDAHBKZZ2Y9QVMEVO'
});

var nestAjax = function(query){

	var tempIds = [];

	myNest.song.search(query, function (error, response) {
	    if (error) {
	        console.log(error, response);
	    } else {
	    	console.log('\n\n\nFIRST SET OF RESULTS:\n' + JSON.stringify(response));
	    	response.songs.forEach(function(value){
	    		tempIds.push(value.id);
	    	});
	        query.start = 100;
			myNest.song.search(query, function (error, response) {
			    if (error) {
			        console.log(error, response);
			    } else {
			    	console.log('\n\n\nSECOND SET OF RESULTS:\n' + JSON.stringify(response));
	    			response.songs.forEach(function(value){
	    				tempIds.push(value.id);
	    			});

	    			setTimeout(function(){
	    				var index = 0;

	    				while(maxDuration > playlistDuration){
	    					spotifyIds.push(tempIds[index]);
	    					playlistDuration += getTrackDuration(tempIds[index])
	    					index++;
	    				}

	    				console.log(JSON.stringify(spotifyIds));
	    				return spotifyIds;
	    			}, 500);
			    }
			});
	    }
	});
}

var getTrackDuration = function(track_id){
	spotify.lookup({ type: 'track', id: track_id}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    else{
	    	console.log(data.duration_ms);
	    	return data.duration_ms;
	    }
	});
}

var createPlaylist = function(){

	var query = {
		"tempo": 300,
		"genres": ["pop", "rap", "reggae","country"],
		"mood": 600,
		"occasion": 2,
		"acousticness": 300,
		"duration": 228000
	};

	maxDuration = query.duration;
	var q = {};
	q.results = 100;
	if(query.tempo > 250){
		q.min_tempo = 250;
	} else{
		q.max_tempo = 250;
	}
	q.style = query.genres;
	// q.min_energy = Math.floor((query.mood - 100)/10)/100;
	// q.max_energy = Math.floor((query.mood + 100)/10)/100;
	if(q.occasion === 1){
		q.min_danceability = 0.6;
	} else if(q.occasion === 2){
		q.min_danceability = 0.3;
		q.max_danceability = 0.6;
	} else{
		q.min_danceability = 0.0;
		q.max_danceability = 0.3;
	}
	q.min_acousticness = Math.floor((query.acousticness - 100)/10)/100;
	q.max_acousticness = Math.floor((query.acousticness + 100)/10)/100;

	console.log(JSON.stringify(q));

	nestAjax(q);
}

router.createPlaylist = createPlaylist;
module.exports = router;