echonest = require('echonest');
var myNest = new echonest.Echonest({
    api_key: 'JDAHBKZZ2Y9QVMEVO'
});

myNest.song.search({
	song_type: ['live', 'christmas'],
	bucket: ['artist_discovery']
}, function (error, response) {
    if (error) {
        console.log(error, response);
    } else {
        console.log(JSON.stringify(response.songs[0]));
    }
});