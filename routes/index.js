var express = require('express');
var playlistMaker = require('../playlistMaker');
var mongo = require('../accessMongo');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = mongo.getPlaylists();
	res.render('index', {data: data});
});

router.get('/search', function(req, res, next) {
	playlistMaker.createPlaylist(req.query);
});

router.post('/safe', function(req, res, next) {
	mongo.safePlaylist(req.data);
});

module.exports = router;
