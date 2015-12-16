var populateWidget = function(spotifyIdArray){
	var widgetInternalHTML = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:'

	for (var i = 0; i < spotifyIdArray.length; i++){
		widgetInternalHTML += spotifyIdArray[i] += ",";
	}

	widgetInternalHTML += '" frameborder="0" allowtransparency="true"></iframe>';

	$("#divForWidget").html(widgetInternalHTML);
}


