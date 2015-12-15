var express = require('express');
var playlistMaker = require('../playlistMaker');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
	playlistMaker.createPlaylist(req.query);
});

module.exports = router;
