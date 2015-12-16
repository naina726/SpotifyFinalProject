var spotifyIds = [];
var queryString = "http://developer.echonest.com/api/v4/song/search?api_key=JDAHBKZZ2Y9QVMEVO&format=json&results=100&artist=radiohead";

/* 

var compileNestSearch = function(paramsFromForm) {
    //what is the value of empty form elements 
    if (paramsFromForm.chill != NULL) {}

}
*/

var getData = function(query){
	$.ajax({
		url: '/search',
		type: 'GET',
		query: query,
		success: function(data) {

		},
		error: function(){
			console.log("Echo nest ajax call failed"); 
		}
	})
}
