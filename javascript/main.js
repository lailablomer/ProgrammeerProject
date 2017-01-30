/**
 * Programmeer Project
 *
 * Laila Blömer
 *
 * main.js file called by index.html and used to fill page with data visualizations.
 */

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
        "A": "> 100 MM",
        "B": "50 - 100 MM",
        "C": "10 - 50 MM",
        "D": "1 - 10 MM",
        "E": "100 - 1000 M",
        "F": "< 100 M" }},
    {labels: {
        "A": "> 10M",
        "B": "1 - 10M",
        "C": "500 - 1000K",
        "D": "100 - 500K",
        "E": "50 - 100K",
        "F": "< 50K" }}];
var legend = {};

// pie colors
var pie_colors = {"GHG": "#1b9e77", "CO2": "#d95f02", "CH4": "#7570b3", "N2O": "#e7298a", "Rest": "#66a61e"};

// initial variables
var world_year = 2012;
var world_data = "button_GHG";
var country_id = "NLD";
var pie_data = 0;

// information table data
var title = ["Carbon Dioxide", "Methane", "Nitrous Oxide"];
var properties = ["Carbon dioxide is colorless. At low concentrations, the gas is odorless. At higher concentrations it has a sharp, acidic odor.", "Methane is a tetrahedral molecule with four equivalent C–H bonds. At room temperature and standard pressure, methane is a colorless, odorless gas.", "At room temperature, it is a colorless, odorless non-flammable gas, with a slightly sweet taste."];
var production = ["The combustion of all carbon-based fuels produces carbon dioxide. Also, all aerobic organisms produce CO2 when they oxidize carbohydrates, fatty acids, and proteins.", "Natural methane is found both below ground and under the sea floor. When it reaches the surface and the atmosphere, it is known as atmospheric methane. Naturally occurring methane is mainly produced by the process of methanogenesis. This multistep process is used by microorganisms as an energy source. ", "The production of adipic acid is the largest source to nitrous oxide. It specifically arises from the degradation of the nitrolic acid intermediate derived from nitration of cyclohexanone."];
var uses = ["Carbon dioxide is used by the food industry, the oil industry, and the chemical industry.", "Methane is used in industrial chemical processes and may be transported as a refrigerated liquid (liquefied natural gas, or LNG). ", "It is used in surgery and dentistry for its anaesthetic and analgesic effects. It is known as 'laughing gas' due to the euphoric effects of inhaling it, a property that has led to its recreational use as a dissociative anaesthetic. It is also used as an oxidizer in rocket propellants, and in motor racing to increase the power output of engines."];
var role = ["Carbon dioxide is an end product of cellular respiration in organisms that obtain energy by breaking down sugars, fats and amino acids with oxygen as part of their metabolism", "Methane as natural gas has been so abundant that synthetic production of it has been limited to special cases and as of 2016 covers only minor fraction of the methane used.", "The pharmacological mechanism of action of N2O in medicine is not fully known. However, it has been shown to directly modulate a broad range of ligand-gated ion channels (in the brain), and this likely plays a major role in many of its effects."];
var weight = ["44.009 g/mol", "16.04246 g/mol", "44.0128 g/mol"];

// initializing worldmap
var map = new Datamap({
    element: document.getElementById("worlddata"),
    projection: "mercator",
    width: 820,
    geographyConfig: {
        // on hover template:
        // "<style top="+10px"></style>"
        popupTemplate: function (geo, data) {
            if (data) {
                return "<div class=hoverinfo <ul><strong>"+ geo.properties.name +"</strong></div>"; }
            // if there is no data for that country, just return country name
            else {
                return "<div class=hoverinfo <strong>"+ geo.properties.name +": No data</strong></div>"; }
        },
        highlightOnHover: true,
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
slider.call(d3.slider().value(100).on("slide", function(evt, value) {
    world_year = Math.round(value/100 * (2012-1990) + 1990);
    drawWorldMap(world_data, world_year);
    worldMapClick(world_year, country_id);
}));
d3.select("#handle-one").remove();

// removing "," in axis names of slider
d3.selectAll("g.tick text").text(function () {
    return this.innerHTML.replace(",", "")} );

// adding button interactivity
d3.selectAll(".button").on("click", function() {
    world_data = this.id;
    drawWorldMap(world_data, world_year);
});

// linegraph
var dataNest;
var parseDate = d3.time.format("%Y").parse;
var bisectDate = d3.bisector(function(d) { return d.year; }).left;

// set the dimensions of the graph
var margin = {top: 30, right: 50, bottom: 40, left: 40},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y"));

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// define the line
var gasline = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.Amount)});

// define div for graph
d3.select("#multi_linegraph").append("div")
    .attr("id", "linegraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// add the svg canvas
var svg = d3.select("#linegraph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// get the first linegraph data
d3.json("scripts/data_linegraph.json", function(error, data) {
    data = data.NLD;

    // nest the data
    nestData(data);

    // spacing of line legend
    var legendSpace = width/dataNest.length;

    // add the x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("text-anchor", "end")
        .text("Million Tonnes");

    // draw lines
    dataNest.forEach(function(d, i) {
        svg.append("path")
            .attr("class", "line")
            .attr("d", gasline(d.values))
            .style("stroke", function() {
                return pie_colors[d.key]; });
        // add legend
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)
            .attr("y", height + margin.bottom)
            .attr("class", "line-legend")
            .style("fill", function() {
                return d.color = pie_colors[d.key]; })
            .text(d.key)
            // add interactive element: on legend-click table information and molecule change
            .on("click", function () {
                if (this.innerHTML != "Rest") {
                    writeTable(this.innerHTML);
                    changeMolecule(this.innerHTML);
                } });
    });
});

// add interaction crosshair for linegraph
var crosshairN2O = svg.append("g")
    .attr("class", "crosshair")
    .attr("id", "crosshairN2O")
    .style("display", "none");
var crosshairCH4 = svg.append("g")
    .attr("class", "crosshair")
    .attr("id", "crosshairCH4")
    .style("display", "none");
var crosshairCO2 = svg.append("g")
    .attr("class", "crosshair")
    .attr("id", "crosshairCO2")
    .style("display", "none");
var crosshairRest = svg.append("g")
    .attr("class", "crosshair")
    .attr("id", "crosshairRest")
    .style("display", "none");

// append the x line to crosshair element
d3.select("#crosshairCO2").append("line")
    .attr("class", "xline")
    .attr("y1", 0)
    .attr("y2", - height);

// append the y line to crosshair element
d3.selectAll(".crosshair").append("line")
    .attr("class", "yline")
    .attr("x1", width)
    .attr("x2", width);

// add tooltip to display crosshair info
var tooltip = d3.select("#linegraph").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// define rectangle element for mouse over interaction
svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function () {
        d3.selectAll(".crosshair").style("display", null);
        d3.select(".text").style("display", null);
        d3.select(".tooltip").style("display", null)})
    .on("mouseout", function () {
        d3.selectAll(".crosshair").style("display", "none");
        d3.select(".text").style("display", "none");
        d3.select(".tooltip").style("display", "none"); })
    .on("mousemove", mousemove);


// pie chart
// changing data format for piechart
var getData = function(data, id){
    country_id = id;
    return {"CO2": data[id]["CO2"], "CH4": data[id]["CH4"], "N2O": data[id]["N2O"], "Rest": data[id]["Rest"]};
};

// calling pie chart
var chart = pie()
    .$el(d3.select("#pie"))
    .data(getData);

// molecule graph
var width_mol = 530,
    height_mol = 200;

var color = d3.scale.category20();

var radius = d3.scale.sqrt()
    .range([0, 6]);

var molecule = d3.select("svg#molecule")
    .attr("width", width_mol)
    .attr("height", height_mol);

var force = d3.layout.force()
    .size([width_mol, height_mol])
    .charge(-400)
    .linkDistance(function(d) { return radius(d.source.size) + radius(d.target.size) + 20; });

// initialize first visualizations and tables
drawWorldMap(world_data, world_year);
worldMapClick(world_year, country_id);
writeTable("CO2");
changeMolecule("CO2");
