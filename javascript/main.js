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

window.onload = function() {
    // initialize first worldmap
    drawWorldMap(world_data, world_year);

    // call piechart, linegraph
    worldMapClick(world_year, country_id);

    // write information table
    writeTable("CO2");

    // draw first molecule
    changeMolecule("CO2");

    // display modal on load
    $('#myModal').modal('toggle');
};
