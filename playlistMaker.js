var echo = require('echonest');
var spotify = require('spotify');
var express = require('express');
var router = express.Router();

var getTrackDuration = function(track_id){
	spotify.lookup({ type: 'track', id: track_id }, function(err, data) {
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

var createPlaylist = function(query){
	getTrackDuration(query);
}

router.createPlaylist = createPlaylist;
module.exports = router;