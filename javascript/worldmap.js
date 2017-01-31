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
        "F": "< 5 Million",
        "E": "5 - 10 M",
        "D": "10 - 25 M",
        "C": "25 - 50M",
        "B": "50 - 250 M",
        "A": "> 250 Million"}
    },
    {labels: {
        "A": "> 10 Million",
        "B": "1 - 10M",
        "C": "500 - 1000K",
        "D": "100 - 500K",
        "E": "50 - 100K",
        "F": "< 50 Thousand" }}];
var legend = {};

var colorcoding = {"GHG": [4000, 1000, 500, 100, 50],
    "population": [250000000, 50000000, 25000000, 10000000, 5000000],
    "GDP": [10000000, 1000000, 500000, 100000, 50000]};

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
        highlightFillColor: "lightgrey",
        highlightBorderColor: "#444",
        borderColor: "#111",
        borderWidth: 0.5,
        transparency: 15,
        popupOnHover: true
    },
    fills: {
        defaultFill: "grey",
        "F": legend[0],
        "E": legend[1],
        "D": legend[2],
        "C": legend[3],
        "B": legend[4],
        "A": legend[5]
    }
});

// initializing slider
var axis = d3.svg.axis().orient("bottom").ticks(11);
var slider = d3.select("#slider").call(d3.slider().axis(axis).min(1990).max(2012).step(1).value(world_year));

// removing "," in axis names of slider
d3.selectAll("g.tick text").text(function () {
    return this.innerHTML.replace(",", "")} );
