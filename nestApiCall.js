var spotifyIds = [];
var queryString = "http://developer.echonest.com/api/v4/song/search?api_key=JDAHBKZZ2Y9QVMEVO&format=json&results=100&artist=radiohead";

/* 

var compileNestSearch = function(paramsFromForm) {
    //what is the value of empty form elements 
    if (paramsFromForm.chill != NULL) {}

}
*/

var nestAjax = function(){
    $.ajax({
        url: queryString,
        type: 'GET',
        success: function(data) {
	        for (var i=0; i<data.response.songs.length; i++){
	        	spotifyIds.push(data.response.songs[i].id);
	        };
	        console.log(spotifyIds);
			queryString += "&start=100";
			$.ajax({
		        url: queryString,
		        type: 'GET',
		        success: function(data) {
			        for (var i=0; i<data.response.songs.length; i++){
			        	spotifyIds.push(data.response.songs[i].id);
			        };
			        console.log(spotifyIds);
			    },
			    error: function(){
			    	console.log("Echo nest ajax call 2 failed"); 
			    }
		    })
	    },
	    error: function(){
	    	console.log("Echo nest ajax call failed"); 
	    }
    })
}
