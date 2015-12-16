var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/FinalProject');
var collection = db.get('playlists');

var safePlaylist = function(playlist){
	// Submit to the DB
	collection.insert(playlist, function (err, doc) {
		if (err) {
		    // If it failed, return error
		    res.send("There was a problem adding the information to the database.");
		}
		else {
		}
	});
}

var getPlaylists = function(){
	collection.find({},{},function(e,docs){
		return docs;
	});
}

router.safePlaylist = safePlaylist;
router.getPlaylists = getPlaylists;
module.exports = router;