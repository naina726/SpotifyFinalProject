
$(".show").click(function(){
    $(".more-genres").toggle();
});

$("#show-decades").click(function(){
    $(".more-decades").toggle();
});

$(function() {
$("#slider-range").slider({
        range: true,
        min: 1960,
        max: 2015,
        values: [1975, 1990],
        slide: function(event, ui) {
            $("#decadeRange").val( ui.values[0] + " - " + ui.values[1]);
        }
    });
    $("#decadeRange").val( $("#slider-range").slider("values", 0) +
        " - " + $("#slider-range").slider("values", 1));
});