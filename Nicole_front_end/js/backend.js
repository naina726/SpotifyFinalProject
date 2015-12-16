var query = "";
var allPLs = [];
var currentPlaylist = [];

function prepareEventHandlers() {
	
	//When 'Search' button is pressed:
	$("#searchBtn").click(function(e) {
		prepareQueryString();
	});

	//when an occasion button is pressed:
	$(".occasion").click(function(e) {
		selectOccasion(this);
	})

	//initializes sliders 
	$("input[type='range']").slider();

	$("#savePLBtn").click(function(e) {
		savePL();
	});
}



/////////////// prepare query string for ajax call:
function prepareQueryString() {

	console.log("preparing query string");

	var tempo = $("#tempo-slider").val();
	var genres = [];
	$("input:checked").each(function(i, obj){
		genres.push($(obj).attr("value"));
	});
	// console.log(JSON.stringify(genres));
	var mood = $("#mood-slider").val();

	var occasionBtn = $(".occasion.selected").text();
	var occasion = 1;
	if(occasionBtn == "Dance Party") {
		occasion = 1;
	} else if(occasionBtn == "Dinner") {
		occasion = 2;
	} else if(occasionBtn == "Relaxation") {
		occasion = 3;
	} else if(occasionBtn == "Chill") {
		occasion = 4;
	}

	var acousticness = $("#acous-slider").val();
	var duration =  $("#Hours").val()*18000000 + $("#Minutes").val()*300000;

	if($(".w-row.checkbox-row.more-decades").css("display") == "none") {
		var startYr = 1960;
		var endYr = 2015;

	} else {
		var startYr = $("#slider-range").slider("values", 0);
		var endYr = $("#slider-range").slider("values", 1);

	}



	console.log("tempo = " + tempo);
	console.log("genres = " + genres);
	console.log("mood = " + mood);
	console.log("occasion = " + occasion);
	console.log("acousticness = " + acousticness);
	console.log("duration = " + duration);
	console.log("startYr = " + startYr);
	console.log("endYr = " + endYr);


		query = {
			"tempo": tempo, //0-1000
			"genres": genres,
			"mood": mood, //0-1000
			"occasion": occasion, //1-4
			"acousticness": acousticness, //0-1000
			"duration": duration, // in ms starting from like 500000
			"from": startYr,
			"to": endYr
		};

		getData(query);

}



function selectOccasion(selectedElement) {
	$(".occasion.selected").removeClass('selected');
	$(selectedElement).addClass('selected');
}




var getData = function(query){
	$.ajax({
		url: '/search',
		type: 'GET',
		query: query,
		success: function(data) {



			var widgetInternalHTML = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:'
			for (var i = 0; i < data.length; i++){
				widgetInternalHTML += data[i] += ",";
			}

			widgetInternalHTML += '" frameborder="0" allowtransparency="true"></iframe>';

			$("#spotWidget").html(widgetInternalHTML)

		},
		error: function(){
			console.log("Echo nest ajax call failed"); 
		}
	})
}

$(document).ready(function () {
	prepareEventHandlers();
});


/////////////// CODE TO Save a playlist ///////////////

function savePL() {

	$("#myModalLabel").text("Save a Playlist");
	$("#newPLInputs").css("display", "inline");
	$('#PLModal').modal();
	$("#saveChangesBtn").css("display", "inline");

	//when someone clicks on save changes button:
	$("#saveChangesBtn").click(addPL = function(e) {

		var newName = $("#newPLName").val();
		console.log("new Name = " + newName);

		if(newName  =="") {
			e.preventDefault();
			alert("Please enter a name!")
			return false;
		} else {

			e.preventDefault();
			var found = false;
			for(var i = 0; i < allPLs.length; i++) {
		    	if (allPLs[i].name == newName) {
		        	found = true;
		        	break;
		    	}
			}

			if(found) {
				e.preventDefault;
				alert("That playlist already exists. Please enter a different name.")
			} else {
				var newPL = {
					name: newName,
					tracks: currentPlaylist
				};
				allPLs.push(newPL);
				$("#newPLName").val("");
				$("#newPLInputs").css("display", "none");
				$('#PLModal').modal('toggle');
				$("#saveChangesBtn").off("click", addPL);
				updatePLsSection();
	
			}
			console.log("# of PLs = " + allPLs.length);

		} 
		
	});
}

function updatePLsSection() {

	if(allPLs.length == 0){
		$("#noPLsh3").css("display","block");
		$("#PLDisplayArea").html("");
	} else {

		//Show created playlists in the sidebar:
		$("#noPLsh3").css("display", "none");
		$("#PLDisplayArea").html("");

		var PLList = $("<ul id='allPLsUL'></ul>");

		for(var i = 0; i < allPLs.length; i++) {

			var PLName = allGroups[i].name;
			var li = $("<li id='" + PLName + "'></li>");
			var PLLink = $("<a href='#'>" + PLName + "</a>");
			li.append(PLLink);
			PLList.append(li);

		}
		$("#PLDisplayArea").append(PLList);

		$("#PLDisplayArea ul li").click(function(e) {
			console.log("You clicked a link!");


			var clickedPLName = this.id;
			var clickedPL;
			for(var i =0; i < allPLs.length; i++) {
				if(allPLs[i].name == clickedPLName) {
					clickedPL = allPLs[i];
				}
			}

			//displayGroupInfoTable(clickedGroup);

		})
		
	}
	//updateModalTable();
}


