/**
 * Programmeer Project
 *
 * Laila Blömer
 * 10563865
 *
 * worldmap.js script to render worldmap and slider
 */

// initial variable
var world_year = 2012;

// worldmap colors
var GHG_colors = ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"];
var population_colors = ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"];
var GDP_colors = ["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"];
var worldmap_colors = [];

// worldmap legend colors
var legend_total = [{labels: {
        "A": "(CO2e) > 4000 Mt",
        "B": "1000 - 4000 Mt",
        "C": "500 - 1000 Mt",
        "D": "100 - 500 Mt",
        "E": "50 - 100 Mt",
        "F": "< 50 Mt" }},
    {labels: {
        "A": "> 100 Million",
        "B": "50 - 100 MM",
        "C": "10 - 50 MM",
        "D": "1 - 10 MM",
        "E": "100 - 1000 M",
        "F": "< 100 Thousand" }},
    {labels: {
        "A": "> 10 Million",
        "B": "1 - 10M",
        "C": "500 - 1000K",
        "D": "100 - 500K",
        "E": "50 - 100K",
        "F": "< 50 Thousand" }}];
var legend = {};

// initializing worldmap
var map = new Datamap({
    element: document.getElementById("worlddata"),
    projection: "mercator",
    width: 820,
    geographyConfig: {
        // on hover template:
        popupTemplate: function (geo, data) {
            if (data) {
                return "<div class=hoverinfo <ul><strong>" + geo.properties.name + "</strong></div>"; }
            // if there is no data for that country, just return country name
            else {
                return "<div class=hoverinfo <strong>"+ geo.properties.name +": No data</strong></div>"; }
        },
        highlightOnHover: true,
        highlightFillColor: "#ae017e",
        highlightBorderColor: "#fff",
        borderColor: "#111",
        borderWidth: 0.5,
        transparency: 15,
        popupOnHover: true
    },
    fills: {
        defaultFill: "grey",
        "A": legend[5],
        "B": legend[4],
        "C": legend[3],
        "D": legend[2],
        "E": legend[1],
        "F": legend[0]
    }
});

// initializing slider
var axis = d3.svg.axis().orient("bottom").ticks(11);
var slider = d3.select("#slider").call(d3.slider().axis(axis).min(1990).max(2012).step(1).value(world_year));

// removing "," in axis names of slider
d3.selectAll("g.tick text").text(function () {
    return this.innerHTML.replace(",", "")} );
