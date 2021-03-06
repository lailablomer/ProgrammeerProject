/** Programmeer Project
 *
 * Laila Blömer
 * 10563865
 *
 * linegraph.js initializes first multi-linegraph
 */

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
    .y(function(d) { return y(d.Amount)})
    .interpolate("cardinal");

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

// render first linegraph
firstLinegraph();

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
