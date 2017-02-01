/**
 * Programmeer Project
 *
 * Laila Blömer
 * 10563865
 *
 * main.js file called by index.html and used to fill page with data visualizations.
 */

// initial variables
var world_data = "GHG";
var country_id = "NLD";
var pie_data = 0;

// call slider
slider.call(d3.slider().value(100).on("slide", function(evt, value) {
    world_year = Math.round(value/100 * (2012-1990) + 1990);

    // redraw worldmap, piechart, linegraph
    drawWorldMap(world_data, world_year);
    worldMapClick(world_year, country_id);
}));
d3.select("#handle-one").remove();

// call buttons click-on element
d3.selectAll(".button").on("click", function() {
    world_data = this.id;

    // redraw worldmap
    drawWorldMap(world_data, world_year);
});

// pie colors
var pie_colors = {"GHG": "#1b9e77", "CO2": "#d95f02", "CH4": "#7570b3", "N2O": "#e7298a", "Rest": "#66a61e"};

// changing data format for pie chart
var getData = function(data, id){
    country_id = id;
    return {"CO2": data[id]["CO2"], "CH4": data[id]["CH4"], "N2O": data[id]["N2O"], "Rest": data[id]["Rest"]};
};

// calling pie chart
var chart = pie()
    .$el(d3.select("#pie"))
    .data(getData);

// initialize first worldmap
drawWorldMap(world_data, world_year);

// call piechart, linegraph
worldMapClick(world_year, country_id);

// write information table
writeTable("CO2");

// draw first molecule
changeMolecule("CO2");

$('.myModal').modal('toggle');
