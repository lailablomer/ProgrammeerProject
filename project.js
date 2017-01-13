/**
 * Created by Gebruiker on 11/01/2017.
 */

// Worldmap
var GHG_colors = ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026'];
var population_colors = ['#ffffcc','#c7e9b4','#7fcdbb','#41b6c4','#2c7fb8','#253494'];
var GDP_colors = ['#ffffcc','#d9f0a3','#addd8e','#78c679','#31a354','#006837'];

var map = new Datamap({
    element: document.getElementById('container'),
    projection: 'mercator',
    width: 800,
    geographyConfig: {
        // on hover template:
        popupTemplate: function (geo, data) {
            // return data values from data array
            if (data) {
                return "<div class='hoverinfo' <ul><strong>"+ geo.properties.name +"</strong>" +
                    "<li class='info'>Green House Gases: " + Math.round(data.GHG) +" Million Tonnes</li>" +
                    "<li class='info'>Population: " + data.population +"</li>" +
                    "<li class='info'>Gross Domestic Product: " + data.GDP +" USD</li>" +
                "</ul></div>"
                ; }
            // if there is no data for that country, just return country name
            else {
                return "<div class='hoverinfo' <strong>"+ geo.properties.name +": No data</strong></div>"; } },
        highlightOnHover: true,
        highlightFillColor: '#e1ad21',
        borderColor: '#444',
        borderWidth: 0.5
    },
    fills: {
        // if country is not in data array, use grey as color
        defaultFill: 'grey',
        '> 4000 Mt': GHG_colors[5],
        '1000 - 4000 Mt': GHG_colors[4],
        '500 - 1000 Mt': GHG_colors[3],
        '100 - 500 Mt': GHG_colors[2],
        '50 - 100 Mt': GHG_colors[1],
        '< 50 Mt': GHG_colors[0],
        '> 100 million': population_colors[5],
        '50 - 100 million': population_colors[4],
        '10 - 50 million': population_colors[3],
        '1 - 10 million': population_colors[2],
        '100 - 1000 thousand': population_colors[1],
        '< 100 thousand': population_colors[0],
        '> 10 million': GDP_colors[5],
        '1 - 10 millions': GDP_colors[4],
        '500 - 1000 thousand': GDP_colors[3],
        '100 - 500 thousand': GDP_colors[2],
        '50 - 100 thousand': GDP_colors[1],
        '< 50 thousand': GDP_colors[0]
    },
    done: function(Datamap) {
        Datamap.svg.selectAll('.datamaps-subunit').on('click', function(d) {
            if (data[d.id]) {
                // update barchart and donutchart
                // barchart(data[d.id], d.properties.name);
                // chart.data(getData(data, d.id)).render();
            } });
}});

function drawWorldMap(id) {
    if (id == 'GHG') {
        d3.json("data_file.json", function(error, data) {
            for (country in data[2012]) {
                if (data[2012][country]['GHG'] > 4000){
                    data[2012][country].fillKey = '> 4000 Mt'
                }
                else if (data[2012][country]['GHG'] > 1000){
                    data[2012][country].fillKey = '1000 - 4000 Mt'
                }
                else if (data[2012][country]['GHG'] > 500){
                    data[2012][country].fillKey = '500 - 1000 Mt'
                }
                else if (data[2012][country]['GHG'] > 100){
                    data[2012][country].fillKey = '100 - 500 Mt'
                }
                else if (data[2012][country]['GHG'] > 50){
                    data[2012][country].fillKey = '50 - 100 Mt'
                }
                else {
                    data[2012][country].fillKey = '< 50 Mt'
                }}
        data = data[2012];
        map.updateChoropleth(data);
        })}
    else if (id == 'Population') {
        d3.json("data_file.json", function(error, data) {
            for (country in data[2012]) {
                if (data[2012][country]['population'] > 100000000){
                    data[2012][country].fillKey = '> 100 million'
                }
                else if (data[2012][country]['population'] > 50000000){
                    data[2012][country].fillKey = '50 - 100 million'
                }
                else if (data[2012][country]['population'] > 10000000){
                    data[2012][country].fillKey = '10 - 50 million'
                }
                else if (data[2012][country]['population'] > 5000000){
                    data[2012][country].fillKey = '1 - 10 million'
                }
                else if (data[2012][country]['population'] > 100000){
                    data[2012][country].fillKey = '100 - 1000 thousand'
                }
                else {
                    data[2012][country].fillKey = '< 100 thousand'
                }}
        data = data[2012];
        map.updateChoropleth(data);
        })
    }
    else {
        d3.json("data_file.json", function(error, data) {
            for (country in data[2012]) {
                if (data[2012][country]['GDP'] > 10000000){
                    data[2012][country].fillKey = '> 10 million'
                }
                else if (data[2012][country]['GDP'] > 1000000){
                    data[2012][country].fillKey = '1 - 10 millions'
                }
                else if (data[2012][country]['GDP'] > 500000){
                    data[2012][country].fillKey = '500 - 1000 thousand'
                }
                else if (data[2012][country]['GDP'] > 100000){
                    data[2012][country].fillKey = '100 - 500 thousand'
                }
                else if (data[2012][country]['GDP'] > 50000){
                    data[2012][country].fillKey = '50 - 100 thousand'
                }
                else {
                    data[2012][country].fillKey = '< 50 thousand'
                }}
        data = data[2012];
        map.updateChoropleth(data);
        map.updatePopup();
        })
    }
    map.legend();
}

d3.selectAll(".button").on('click', function() {drawWorldMap(this.id);});
// initiate first worldmap with GHG data
drawWorldMap('GHG');

// Linegraph
// set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// define the line
var GHG = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.GHG)});
var CO2 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.CO2)});
var CH4 = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.CH4)});
var N2H = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.N2H)});

// define div for graph
d3.select("#container").append("div")
    .attr("id", "linegraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// title
d3.select("#linegraph").append("h2")
    .text("Daily Temperature, 1994");

// adds the svg canvas
var svg = d3.select("#linegraph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.json('nl.json', function(error, data) {data.forEach(function (d) {
        d.year = +d;
        d.GHG = +Math.round(d.GHG);
        d.CO2 = +Math.round(d.CO2);
        d.N2H = +Math.round(d.N2H);
        d.CH4 = +Math.round(d.CH4);
    });

    var set = 0;

    // scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return d.year;
    }));
    y.domain(0,
        d3.max(data, function (d) {
            return d.GHG;
    }));

    // nest the entries by key
    var dataNest = d3.nest()
        .key(function (d) {
            return d.station;
        })
        .entries(data);

    // add the x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .attr('text-anchor', 'end')
        .text("degrees celsius");

    // add lines
    svg.append("path")
        .attr("class", "line1")
        .attr("d", line_gem(dataNest[set].values));

    svg.append("path")
        .attr("class", "line2")
        .attr("d", line_min(dataNest[set].values));

    svg.append("path")
        .attr("class", "line3")
        .attr("d", line_max(dataNest[set].values));

    var title = svg.append("text")
        .attr("x", 30)
        .attr("y", 30);

    // add 4 interaction elements
    var focus1 = svg.append("g")
        .attr("class", "focus")
        .attr("id", "focus1")
        .style("display", "none");

    var focus2 = svg.append("g")
        .attr("class", "focus")
        .attr("id", "focus2")
        .style("display", "none");

    var focus3 = svg.append("g")
        .attr("class", "focus")
        .attr("id", "focus3")
        .style("display", "none");

    var focus4 = svg.append("g")
        .attr("class", "text")
        .attr("id", "focus4")
        .style("display", "none");

    // define text tags to display interaction info
    d3.select(".text").append("text")
        .attr("class", "info")
        .attr("x", width - 180)
        .attr("y", 20);
    d3.select(".text").append("text")
        .attr("class", "infomax")
        .attr("x", width - 180)
        .attr("y", 35);
    d3.select(".text").append("text")
        .attr("class", "infogem")
        .attr("x", width - 180)
        .attr("y", 50);
    d3.select(".text").append("text")
        .attr("class", "infomin")
        .attr("x", width - 180)
        .attr("y", 65);

    // append the x line to focus element
    d3.select(".focus").append("line")
        .attr("class", "xline")
        .attr("y1", 0)
        .attr("y2", height);

    // append the y line to focus element
    d3.selectAll(".focus").append("line")
        .attr("class", "yline")
        .attr("x1", width)
        .attr("x2", width);

    // append circle
    d3.selectAll(".focus").append("circle")
        .attr("r", 4.5);

    // define rectangle element for mouse over interaction
    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function () {
            d3.selectAll(".focus").style("display", null);
            d3.select(".text").style("display", null); })
        .on("mouseout", function () {
            d3.selectAll(".focus").style("display", "none");
            d3.select(".text").style("display", "none"); })
        .on("mousemove", mousemove);

    // set right interactions on mouse movement
    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(dataNest[set].values, x0, 1),
            d0 = dataNest[set].values[i - 1],
            d1 = dataNest[set].values[i],
            d = x0 - d0 > d1 - x0 ? d1 : d0;

        // transform position crosshair
        focus1.attr("transform", "translate(" + x(d.date) + "," + y(d.temp_gem) + ")");
        focus2.attr("transform", "translate(" + x(d.date) + "," + y(d.temp_min) + ")");
        focus3.attr("transform", "translate(" + x(d.date) + "," + y(d.temp_max) + ")");

        // display text
        focus4.select("text.info").text(formatDate(d.date));
        focus4.select("text.infomax").text("Maximum temperature: " + d.temp_max);
        focus4.select("text.infogem").text("Average temperature: " + d.temp_gem);
        focus4.select("text.infomin").text("Minimum temperature: " + d.temp_min);

        // display lines from crosshair
        focus1.select(".xline")
            .attr("y1", y(d.temp_gem) * -1)
            .attr("y2", height - y(d.temp_gem));
        d3.selectAll(".focus").select(".yline")
            .attr("x1", x(d.date) * -1)
            .attr("x2", width);
    }
});