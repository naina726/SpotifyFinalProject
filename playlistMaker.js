var echo = require('echonest');
var spotify = require('spotify');
var express = require('express');
var router = express.Router();

var playlistDuration = 0;
var maxDuration;
var year_range;
var myNest = new echo.Echonest({
    api_key: 'JDAHBKZZ2Y9QVMEVO'
});

var countLength = function(songs, res){
	var finalArray = [];

	for(var i=0; i<songs.length; i++){
		if(songs[i].tracks.length !== 0){
				var track_id = songs[i].tracks[0].foreign_id.substring(14);
				finalArray.push(track_id);
				//getTrack(track_id);
			// }else{
			// 	console.log(finalArray);
			// 	res.send(JSON.stringify(finalArray));
			// 	return;
			// }
		}
	}
	//console.log(finalArray);
	res.send(JSON.stringify(finalArray));
	return;
}

var nestAjax = function(query, res){

	var tracks = [];

	myNest.song.search(query, function (err1, resp1) {
	    if (err1) {
	    	console.log('Error in first nest call:\n');
	    } else {
			query.start = 100;
			myNest.song.search(query, function (err2, resp2) {
	    		if (err2) {
	    			console.log('Error in second nest call:\n');
	    		    console.log(err2, response);
	    		} else {
	    			if(resp2.songs.length !== 0){
	    				tracks = resp1.songs.concat(resp2.songs);
	    				//console.log(tracks);
	    				countLength(tracks, res);
	    			}
	    			else{
	    				tracks = resp1.songs;
	    				//console.log(tracks);
	    				countLength(tracks, res);
	    			}

	    		}
			});
		}
	});
}

var getTrack = function(track_id){
	spotify.lookup({ type: 'track', id: track_id}, function(err, data) {
	    if ( err ) {
	        //console.log('Error occurred: ' + err);
	        return false;
	    }
	    else{
	    	playlistDuration += data.duration_ms;
	    }
	});
}

var createPlaylist = function(query, res){

	if(query.duration === 0){
		maxDuration = 9007199254740992;
	}
	else{
		maxDuration = query.duration;
	}
	var q = {};

	q.results = 100;

	q.bucket = ["id:spotify", "tracks"];

	if(query.tempo === 0){

	}
	else if(query.tempo >= 250){
		q.min_tempo = 80;
	} else{
		q.max_tempo = 80;
	}

	if(query.mood === 0){

	}
	else if(query.mood >= 500){
		q.min_energy = 0.5 * query.mood/1000;
	}
	else{
		q.max_energy = 0.5 + 0.5 * (query.mood/1000);
	}

	if(query.occasion === 1){
		q.min_danceability = 0.6;
	} else if(query.occasion === 2){
		q.min_danceability = 0.3;
		q.max_danceability = 0.6;
	} else{
		q.min_danceability = 0.0;
		q.max_danceability = 0.3;
	}

	if(query.acousticness === 0){

	}
	else if(query.acousticness >= 500){
		q.min_acousticness = 0.5 * query.acousticness/1000;
	}
	else{
		q.max_acousticness = 0.5 + 0.5 * (query.acousticness/1000);
	}

	console.log(JSON.stringify(q));

	nestAjax(q, res);
}

router.createPlaylist = createPlaylist;
module.exports = router;