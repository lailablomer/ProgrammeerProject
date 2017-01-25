/**
 * Created by Gebruiker on 11/01/2017.
 */

// Worldmap
var GHG_colors = ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026'];
var population_colors = ['#ffffcc','#c7e9b4','#7fcdbb','#41b6c4','#2c7fb8','#253494'];
var GDP_colors = ['#ffffcc','#d9f0a3','#addd8e','#78c679','#31a354','#006837'];
var worldmap_colors = [];

var legend_total = [{labels: {
        'A': "(CO2e) > 4000 Mt",
        'B': "1000 - 4000 Mt",
        'C': "500 - 1000 Mt",
        'D': "100 - 500 Mt",
        'E': "50 - 100 Mt",
        'F': "< 50 Mt" }},
    {labels: {
        'A': "> 100 MM",
        'B': "50 - 100 MM",
        'C': "10 - 50 MM",
        'D': "1 - 10 MM",
        'E': "100 - 1000 M",
        'F': "< 100 M" }},
    {labels: {
        'A': "> 10M",
        'B': "1 - 10M",
        'C': "500 - 1000K",
        'D': "100 - 500K",
        'E': "50 - 100K",
        'F': "< 50K" }}];
var legend = {};

// pie colors
var pie_colors = {'GHG': '#1b9e77', 'CO2': '#d95f02', 'CH4': '#7570b3', 'N2O': '#e7298a', 'Rest': '#66a61e'};

// initial variables
var world_year = 2012;
var world_data = 'button_GHG';
var country_id = 'NLD';
var pie_data = 0;

// table data
var title = ['Carbon Dioxide', 'Methane', 'Nitrous Oxide'];
var properties = ['Carbon dioxide is colorless. At low concentrations, the gas is odorless. At higher concentrations it has a sharp, acidic odor.', 'Methane is a tetrahedral molecule with four equivalent C–H bonds. At room temperature and standard pressure, methane is a colorless, odorless gas.', 'At room temperature, it is a colorless, odorless non-flammable gas, with a slightly sweet taste.'];
var production = ['The combustion of all carbon-based fuels produces carbon dioxide. Also, all aerobic organisms produce CO2 when they oxidize carbohydrates, fatty acids, and proteins.', 'Natural methane is found both below ground and under the sea floor. When it reaches the surface and the atmosphere, it is known as atmospheric methane. Naturally occurring methane is mainly produced by the process of methanogenesis. This multistep process is used by microorganisms as an energy source. ', 'The production of adipic acid is the largest source to nitrous oxide. It specifically arises from the degradation of the nitrolic acid intermediate derived from nitration of cyclohexanone.'];
var uses = ['Carbon dioxide is used by the food industry, the oil industry, and the chemical industry.', 'Methane is used in industrial chemical processes and may be transported as a refrigerated liquid (liquefied natural gas, or LNG). ', 'It is used in surgery and dentistry for its anaesthetic and analgesic effects. It is known as "laughing gas" due to the euphoric effects of inhaling it, a property that has led to its recreational use as a dissociative anaesthetic. It is also used as an oxidizer in rocket propellants, and in motor racing to increase the power output of engines.'];
var role = ['Carbon dioxide is an end product of cellular respiration in organisms that obtain energy by breaking down sugars, fats and amino acids with oxygen as part of their metabolism', 'Methane as natural gas has been so abundant that synthetic production of it has been limited to special cases and as of 2016 covers only minor fraction of the methane used.', 'The pharmacological mechanism of action of N2O in medicine is not fully known. However, it has been shown to directly modulate a broad range of ligand-gated ion channels (in the brain), and this likely plays a major role in many of its effects.'];
var weight = ['44.009 g/mol', '16.04246 g/mol', '44.0128 g/mol'];
// var image = ['http://embed.molview.org/v1/?mode=balls&cid=280&bg=white','http://embed.molview.org/v1/?mode=balls&cid=297&bg=white', 'http://embed.molview.org/v1/?mode=balls&cid=948&bg=white'];
// var image2 = ['images/carbon.png', 'images/methane.png', 'images/oxide.png'];
// var molecule_CO2 = {"nodes":[{"symbol":"H","size":"1","x":608.9164257997514,"y":250.50285986676047,"id":"2c3ebe15-954d-4a55-ace0-69e94d68652a","bonds":1},{"symbol":"H","size":1,"x":620.4017058873151,"y":319.47618843454785,"id":10,"bonds":1},{"symbol":"H","size":1,"x":515.6719623448416,"y":267.7707586037338,"id":9,"bonds":1},{"symbol":"H","size":1,"x":558.7035525582875,"y":351.38524082871834,"id":8,"bonds":1},{"symbol":"C","size":12,"x":567.2978889198062,"y":292.6065106487642,"id":1,"bonds":0}],"links":[{"source":4,"target":0,"id":"8b91299c-9dda-414c-a5d7-1065a0dca75f","bondType":1},{"source":4,"target":1,"id":211,"bondType":1},{"source":4,"target":2,"id":210,"bondType":1},{"source":4,"target":3,"id":29,"bondType":1}]};
// var molecule_N2O = ;

var map = new Datamap({
    element: document.getElementById('worlddata'),
    projection: 'mercator',
    width: 800,
    geographyConfig: {
        // on hover template:
        // "<style top='+10px'></style>"
        popupTemplate: function (geo, data) {
            // return data values from data array
            if (data) {
                return "<div class='hoverinfo' <ul><strong>"+ geo.properties.name +"</strong>" +
                //     "<li class='info'>Green House Gases: " + Math.round(data.GHG) +" Million Tonnes</li>" +
                //     "<li class='info'>Population: " + data.population +"</li>" +
                //     "<li class='info'>Gross Domestic Product: " + data.GDP +" USD</li>" +
                // "</ul>" +
                "</div>"; }
            // if there is no data for that country, just return country name
            else {
                return "<div class='hoverinfo' <strong>"+ geo.properties.name +": No data</strong></div>"; }
        },

        highlightOnHover: true,
        highlightFillColor: 'gold',
        borderColor: '#111',
        borderWidth: 0.5,
        transparency: 15,
        eventListener: false,
        popupOnHover: true
    },
    fills: {
        defaultFill: 'grey',
        'A': legend[5],
        'B': legend[4],
        'C': legend[3],
        'D': legend[2],
        'E': legend[1],
        'F': legend[0]
    }
});

Datamap.prototype.updatePopup = function (element, d, options) {
    var self = this;
    var hoveroverElement = d3
        .select(self.svg[0][0].parentNode)
        .select('.datamaps-hoverover');
    element.on('mousemove', null);
    element.on('mousemove', function() {
        var position = d3.mouse(self.options.element);
        var data = JSON.parse(element.attr('data-info'));
        self.previouslyRenderedPopup = true;
        var html = options.popupTemplate(d, data);
        if (!(html === self.previousPopupHtml)) {
            hoveroverElement.html(function() {return html});
        }
        hoveroverElement
            .style('top', ( (position[1] + 60)) + "px")
            .style('left', ( position[0]) + "px")
            .style('display', 'block');
        self.previousPopupHtml = html
    });
};

// var time = d3.time.format("%Y").parse;

// Initialize slider
var axis = d3.svg.axis().orient("bottom").ticks(11);
var slider = d3.select("#slider").call(d3.slider().axis(axis).min(1990).max(2012).step(1).value(world_year));
slider.call(d3.slider().value(100).on("slide", function(evt, value) {
    world_year = Math.round(value/100 * (2012-1990) + 1990);
    drawWorldMap(world_data, world_year, country_id);
}));
d3.select("#handle-one").remove();

d3.selectAll("g.tick text").text(function () {
    return this.innerHTML.replace(',', '')} );

d3.selectAll(".button").on('click', function() {
    world_data = this.id;
    drawWorldMap(world_data, world_year, country_id);
});

// initiate first world map with GHG data
drawWorldMap(world_data, world_year, country_id);

// fill table with data
writeTable('CO2');
changeMolecule('CO2');

// Linegraph
var dataNest;
// set the dimensions of the canvas / graph
var margin = {top: 30, right: 50, bottom: 40, left: 40},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;
var bisectDate = d3.bisector(function(d) { return d.year; }).left;

// set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// // define the axes
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

// adds the svg canvas
var svg = d3.select("#linegraph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// get the linegraph data
d3.json('scripts/data_linegraph.json', function(error, data) {
    data = data.NLD;
    data.forEach(function (d) {
        // console.log(d);
        d.Amount = +Math.round(d.Amount);
        d.year = parseDate(d.year);
    });

    // nest the entries by two levels
    dataNest = d3.nest()
        // .key(function (d) { return d.Country; })
        .key(function (d) { return d.Gas; })
        .entries(data);

    x.domain([d3.min(data, function(d) { return d.year; }),
        d3.max(data, function(d) {return d.year; })]);
    y.domain([d3.min(data, function(d) { return d.Amount; }),
        d3.max(data, function(d) { return d.Amount; })]);

    console.log(dataNest[0].values[0].Amount);
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
        .text("Million Tonnes");

    var legendSpace = width/dataNest.length;

    dataNest.forEach(function(d, i) {
        svg.append('path')
            .attr("class", "line")
            .attr('d', gasline(d.values))
            .style("stroke", function() {
                console.log(d.key);
                return pie_colors[d.key]; });

        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)
            .attr("y", height + margin.bottom)
            .attr("class", "legend")
            .style("fill", function() {
                return d.color = pie_colors[d.key]; })
            .text(d.key);
    });

    //
    //
    //
    //
    // svg.selectAll("dot")
    //         .data(dataNest)
    //     .enter().append("circle")
    //         .attr("r", 5)
    //         .attr("cx", function(d) { return x(d.date); })
    //         .attr("cy", function(d) { return y(d.CO2); })
    //         .on("mouseover", function(d) {
    //             div.transition()
    //                 .duration(200)
    //                 .style("opacity", .9);
    //             div.html(formatTime(d.date) + "<br/>"  + d.close)
    //                 .style("left", (d3.event.pageX) + "px")
    //                 .style("top", (d3.event.pageY - 28) + "px");
    //             })
    //         .on("mouseout", function(d) {
    //             div.transition()
    //                 .duration(500)
    //                 .style("opacity", 0);
    //         });

});

// add 5 interaction elements
// var focusGHG = svg.append("g").attr("class", "focus").attr("id", "focusGHG").style("display", "none");
var focusN2O = svg.append("g").attr("class", "focus").attr("id", "focusN2O").style("display", "none");
var focusCH4 = svg.append("g").attr("class", "focus").attr("id", "focusCH4").style("display", "none");
var focusCO2 = svg.append("g").attr("class", "focus").attr("id", "focusCO2").style("display", "none");
var focusRest = svg.append("g").attr("class", "focus").attr("id", "focusRest").style("display", "none");

var formatTime = d3.time.format("%Y");

var tooltip = d3.select("#linegraph").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// focusGHG.append("text").attr("class", "infotextpath").attr("id", "infoGHG").attr("dx", 8).attr("dy", "-.3em");
// focusGHG.append("text").attr("class", "infotext").attr("id", "infoGHG").attr("dx", 8).attr("dy", "-.3em");

focusCO2.append("text").attr("class", "infotextpath").attr("id", "infoCO2").attr("dx", 8).attr("dy", "-.3em");
focusCO2.append("text").attr("class", "infotext").attr("id", "infoCO2").attr("dx", 8).attr("y", 10);
// focusCO2.append("div").attr("class", "tooltip").style("opacity", 0);

// focusCH4.append("text").attr("class", "infotextpath").attr("id", "infoCH4").attr("dx", 8).attr("dy", "-.3em");
// focusCH4.append("text").attr("class", "infotext").attr("id", "infoCH4").attr("dx", 8).attr("dy", "-.3em");
//
// focusN2O.append("text").attr("class", "infotextpath").attr("id", "infoN2O").attr("dx", 8).attr("dy", "-.3em");
// focusN2O.append("text").attr("class", "infotext").attr("id", "infoN2O").attr("dx", 8).attr("dy", "-.3em");
//
// focusRest.append("text").attr("class", "infotextpath").attr("id", "infoRest").attr("dx", 8).attr("dy", "-.3em");
// focusRest.append("text").attr("class", "infotext").attr("id", "infoRest").attr("dx", 8).attr("dy", "-.3em");

// append the x line to focus element
d3.select("#focusCO2").append("line")
    .attr("class", "xline")
    .attr("y1", 0)
    .attr("y2", - height);

// append the y line to focus element
d3.selectAll(".focus").append("line")
    .attr("class", "yline")
    .attr("x1", width)
    .attr("x2", width);

// append circle
// d3.selectAll(".focus").append("circle")
//     .attr("r", 4.5);

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
        d3.select(".text").style("display", "none");
        d3.select(".tooltip").style("opacity", 0); })
    .on("mousemove", mousemove);


// PIECHART
// changing data format for piechart
var getData = function(data, id){
    country_id = id;
    return {"CO2": data[id]["CO2"], "CH4": data[id]["CH4"], "N2O": data[id]["N2O"], "Rest": data[id]["Rest"]};
};

// calling piechart
var chart = pie()
    .$el(d3.select("#pie"))
    .data(getData);

function pie(){
    // default settings
    var $el = d3.select("#pie");
    var data = {};
    var width = 600,
        height = 300,
        viewBox = "0 0 100 100",
        radius = Math.min(width - 400, height) / 2,
        textOffset = 14;

    // color array
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var svg, g, arc, legend;
    var object = {};

    // refreshing chart
    object.render = function(){
        if(!svg){
            arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - (radius/3));

            // define svg for pie
            svg = $el.append("svg")
                .attr("x", 1000)
                .attr("class", "piechart")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            // define arcs
            g = svg.selectAll(".arc")
                .data(pie(d3.entries(data)))
            .enter().append("g")
                .attr("class", "arc");

            var labels = g.append("text")
                .attr("transform", function(d) {
                    return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * (radius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset) + ")"; })
                .attr("dy", ".35em")
                .attr("class", "pie-label");
            // fill arcs with data
            g.append("path")
                .each(function(d) {
                    this._current = d; })
                .attr("d", arc)
                .style("fill", function(d) {
                    return pie_colors[d.data.key]; });
            g.select("text").text(function(d) { return d.data.key; });

            var prev;
            labels.each(function(d, i) {
              if(i > 0) {
                var thisbb = this.getBoundingClientRect(),
                    prevbb = prev.getBoundingClientRect();
                // move if they overlap
                if(!(thisbb.right < prevbb.left ||
                        thisbb.left > prevbb.right ||
                        thisbb.bottom < prevbb.top ||
                        thisbb.top > prevbb.bottom)) {
                    var ctx = thisbb.left + (thisbb.right - thisbb.left)/2,
                        cty = thisbb.top + (thisbb.bottom - thisbb.top)/2,
                        cpx = prevbb.left + (prevbb.right - prevbb.left)/2,
                        cpy = prevbb.top + (prevbb.bottom - prevbb.top)/2,
                        off = Math.sqrt(Math.pow(ctx - cpx, 2) + Math.pow(cty - cpy, 2))/2;
                    d3.select(this).attr("transform",
                        "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) *
                                                (radius + textOffset + off) + "," +
                                       Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                                                (radius + textOffset + off) + ")");
                }
              }
              prev = this;
            });
            // var label_group = svg.append("svg:g")
            //     .attr("class", "arc")
            //     .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");
            //
            // var labels = label_group.selectAll("path")
            //     .data(data)
            //     .enter()
            //     .append("svg:text")
            //     .attr("transform", function(d) {
            //         return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * (radius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset) + ")";
            //     })
            //     .attr("text-anchor", function(d){
            //         if ((d.startAngle  +d.endAngle) / 2 < Math.PI) {
            //             return "beginning";
            //         } else {
            //             return "end";
            //         }
            //     })
            //     .text(function(d) {
            //         return d.data.key;
            //     });

            // define interactive text for above piechart
            // g.append("text")
            //     .attr("class", "keytext")
            //     .attr("x", 140)
            //     .attr("y", 110);

            // svg.append("g").attr("class", "pie-legend");

            // define interactive tooltip
            svg.append("text")
                .datum(data)
                .attr("x", 0)
                .attr("y", radius / 10 )
                .attr("class", "text-tooltip")
                .style("text-anchor", "middle")
                .attr("font-weight", "bold")
                .style("font-size", radius/5 + "px");

            // interactive element
            g.on("mouseover", function(obj){
                svg.select("text.text-tooltip")
                    .attr("fill", function() {
                        return pie_colors[obj.data.key]; })
                    .text(function(d){
                        return Math.round((d[obj.data.key] / pie_data) * 100) + '%';
                    });
                // svg.select("text.keytext")
                //     .attr("fill", function() { return pie_colors[obj.data.key]; })
                //     .text(function(){
                //         return obj.data.key + "     " + Math.round(obj.data.value) + " MtCO2e";
                //     });
                d3.select("td#gas-title")
                    .text(function(){ return obj.data.key; })
                    .attr("color", function() { return pie_colors[obj.data.key]; });
                d3.select("td#gas")
                    .attr("fill", function() { return pie_colors[obj.data.key]; })
                    .text(function(){
                        return Math.round(obj.data.value) + " MtCO2e";
                    });
            });

            // on mouse out, make text empty
            g.on("mouseout", function(obj){
                svg.select("text.text-tooltip").text("");
                svg.select("text.keytext").text("");
                d3.select("td#gas").text("");
                d3.select("td#gas-title").text("");
            });

            g.on("click", function (d) {
                writeTable(d.data.key);
                changeMolecule(d.data.key);
            });

        }else{
            // remove pie and update
            g.data(pie(d3.entries(data))).exit().remove();

            // update arcs
            g.select("path")
                .transition().duration(400)
                .attrTween("d", function(a){
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function(t) {
                        return arc(i(t));
                    };
                });

            // update text
            var labels = g.select("text")
                .attr("transform", function(d) { return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * (radius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset) + ")"; });

            var prev;
            labels.each(function(d, i) {
              if(i > 0) {
                var thisbb = this.getBoundingClientRect(),
                    prevbb = prev.getBoundingClientRect();
                // move if they overlap
                if(!(thisbb.right < prevbb.left ||
                        thisbb.left > prevbb.right ||
                        thisbb.bottom < prevbb.top ||
                        thisbb.top > prevbb.bottom)) {
                    var ctx = thisbb.left + (thisbb.right - thisbb.left)/2,
                        cty = thisbb.top + (thisbb.bottom - thisbb.top)/2,
                        cpx = prevbb.left + (prevbb.right - prevbb.left)/2,
                        cpy = prevbb.top + (prevbb.bottom - prevbb.top)/2,
                        off = Math.sqrt(Math.pow(ctx - cpx, 2) + Math.pow(cty - cpy, 2))/2;
                    d3.select(this).attr("transform",
                        "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) *
                                                (radius + textOffset + off) + "," +
                                       Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                                                (radius + textOffset + off) + ")");
                }
              }
              prev = this;
            });

            // update tooltip
            svg.select("text.text-tooltip").datum(data);
        }
        return object;
    };

    // returning standard values for piechart
    object.data = function(value){
        pie_data = parseInt(value["CO2"]) + parseInt(value["CH4"]) + parseInt(value["N2O"]) + parseInt(value["Rest"]);
        if (!arguments.length) return data;
            data = value;
            return object;
        };

    object.$el = function(value){
        if (!arguments.length) return $el;
            $el = value;
            return object;
        };

    object.width = function(value){
        if (!arguments.length) return width;
            width = value;
            radius = Math.min(width, height) / 2;
            return object;
        };

    object.height = function(value){
        if (!arguments.length) return height;
            height = value;
            radius = Math.min(width, height) / 2;
            return object;
        };

    return object;
}

function drawWorldMap(id, year, country_id) {
    d3.json("scripts/data_file.json", function(error, data) {
        data = data[year];

        if (id == 'button_GHG') {
            for (country in data) {
                if (data[country]['GHG'] > 4000) {
                    data[country].fillKey = 'A';
                    // data[country].fillColor = GHG_colors[5];
                }
                else if (data[country]['GHG'] > 1000) {
                    data[country].fillKey = 'B';
                    // data[country].fillColor = GHG_colors[4];
                }
                else if (data[country]['GHG'] > 500) {
                    data[country].fillKey = 'C';
                    // data[country].fillColor = GHG_colors[3];
                }
                else if (data[country]['GHG'] > 100) {
                    data[country].fillKey = 'D';
                    // data[country].fillColor = GHG_colors[2];
                }
                else if (data[country]['GHG'] > 50) {
                    data[country].fillKey = 'E';
                    // data[country].fillColor = GHG_colors[1];
                }
                else {
                    data[country].fillKey = 'F';
                    // data[country].fillColor = GHG_colors[0];
                }
            }
            worldmap_colors = GHG_colors;
            legend = legend_total[0];
        }
        else if (id == 'button_Population') {
            for (country in data) {
                if (data[country]['population'] > 100000000) {
                    data[country].fillKey = 'A'
                }
                else if (data[country]['population'] > 50000000) {
                    data[country].fillKey = 'B'
                }
                else if (data[country]['population'] > 10000000) {
                    data[country].fillKey = 'C'
                }
                else if (data[country]['population'] > 5000000) {
                    data[country].fillKey = 'D'
                }
                else if (data[country]['population'] > 100000) {
                    data[country].fillKey = 'E'
                }
                else {
                    data[country].fillKey = 'F'
                }
            }
            worldmap_colors = population_colors;
            legend = legend_total[1];
            console.log(legend);
        }
        else {
            for (country in data) {
                if (data[country]['GDP'] > 10000000) {
                    data[country].fillKey = 'A'
                }
                else if (data[country]['GDP'] > 1000000) {
                    data[country].fillKey = 'B'
                }
                else if (data[country]['GDP'] > 500000) {
                    data[country].fillKey = 'C'
                }
                else if (data[country]['GDP'] > 100000) {
                    data[country].fillKey = 'D'
                }
                else if (data[country]['GDP'] > 50000) {
                    data[country].fillKey = 'E'
                }
                else {
                    data[country].fillKey = 'F'
                }
            }
            worldmap_colors = GDP_colors;
            legend = legend_total[2];
        }

        for (key in data) {
            if (data[key].fillKey == 'A') {
                data[key].fillColor = worldmap_colors[5]
            }
            if (data[key].fillKey == 'B') {
                data[key].fillColor = worldmap_colors[4]
            }
            if (data[key].fillKey == 'C') {
                data[key].fillColor = worldmap_colors[3]
            }
            if (data[key].fillKey == 'D') {
                data[key].fillColor = worldmap_colors[2]
            }
            if (data[key].fillKey == 'E') {
                data[key].fillColor = worldmap_colors[1]
            }
            if (data[key].fillKey == 'F') {
                data[key].fillColor = worldmap_colors[0]
            }
        }
        map.updateChoropleth(data);

        // update legend
        d3.select(".datamaps-legend").remove();
        map.legend(legend);
        d3.selectAll(".datamaps-legend dd")
            .each(function(d, i) {
                d3.select(this)
                    .style("background-color", worldmap_colors[5 - i])
            });

        chart.data(getData(data, country_id)).render();
        d3.select("#pie").transition().duration(500).select("h3").text(data[country_id].country);
        writePieTable(year, data[country_id].population, data[country_id].GDP, data[country_id].GHG);

        map.svg.selectAll('.datamaps-subunit').on('click', function(d) {
            country_id = d.id;
            d3.select("#pie").transition().duration(500).select("h3").text(data[country_id].country);
            d3.select("#multi_linegraph").transition().duration(500).select("h3#linegraph-title").text(data[country_id].country);
            drawLinegraph(d.id);
            chart.data(getData(data, country_id)).render();
            writePieTable(year, data[country_id].population, data[country_id].GDP, data[country_id].GHG);
        });
    });
}

function mousemove() {
    for (j = 0; j < 4; j++) {
        var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(dataNest[j].values, x0, 1),
        d0 = dataNest[j].values[i - 1],
        d1 = dataNest[j].values[i],
        d = x0 - d0.year > d1.year - x0 ? d1 : d0;

        // console.log(dataNest[j].values);

        // if (j == 0) {
        //     // transform position crosshair
        //     focusGHG.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
        //     // display text
        //     focusGHG.select("text#infoGHG.infotext").text("Total: " + d.Amount + " MtCO2e");
        //     focusGHG.select("text#infoGHG.infotextpath").text("Total: " + d.Amount + " MtCO2e");
        //     // display lines from crosshair
        //
        //     // focusGHG.select(".yline").attr("x1", x(d.year) * -1).attr("x2", width);
        //     // focusGHG.select(".xline").attr("y1", y(d.Amount) * -1).attr("y2", height - y(d.year));
        // }
        if (j == 0) {
            // transform position crosshair
            focusCO2.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
            // display text
            // focusCO2.select("text.infotextpath#infoCO2").text("CO2: " + d.Amount + " MtCO2e");
            // focusCO2.select("text.infotext#infoCO2").text("CO2: " + d.Amount + " MtCO2e");

            focusCO2.select(".xline").attr("y1", y(d.Amount) * -1).attr("y2", height - y(d.Amount));

            // focusCO2.select("div.tooltip").transition().style("opacity", 0.9);

            tooltip.transition()
                    .duration(100)
                    .style("opacity", .8);
            tooltip.html("CO2: " + d.Amount + " MtCO2e" +
                "<br/> <br/>" + "CH4: " + dataNest[1].values[i].Amount + " MtCO2e" +
                "<br/> <br/>" + "N2O: " + dataNest[2].values[i].Amount + " MtCO2e" +
                "<br/> <br/>" + "Rest: " + dataNest[3].values[i].Amount + " MtCO2e")
                .style("left", (d3.event.pageX) + "px")
                .style("top", 100 + 'px');
        }
        else if (j == 1) {
            // transform position crosshair
            focusCH4.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
            // display text
            focusCH4.select("text#infoCH4.infotext").text("CH4: " + d.Amount + " MtCO2e");
            focusCH4.select("text#infoCH4.infotextpath").text("CH4: " + d.Amount + " MtCO2e");
        }
        else if (j == 2) {
            // transform position crosshair
            focusN2O.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
            // display text
            focusN2O.select("text#infoN2O.infotext").text("N2O: " + d.Amount + " MtCO2e");
            focusN2O.select("text#infoN2O.infotextpath").text("N2O: " + d.Amount + " MtCO2e");
        }
        else {
            // transform position crosshair
            focusRest.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
            // display text
            focusRest.select("text#infoRest.infotext").text("Rest: " + d.Amount + " MtCO2e");
            focusRest.select("text#infoRest.infotextpath").text("Rest: " + d.Amount + " MtCO2e");
        }
        d3.selectAll(".focus").select(".yline").attr("x1", x(d.year) * -1).attr("x2", width - x(d.year));
    }
}

function drawLinegraph(id) {
    d3.json('scripts/data_linegraph.json', function(error, data) {
        for (var key in data) {
            if (key == id) {
                data = data[key];
            }
        }
        // console.log(data);
        data.forEach(function (d) {
            // console.log(d);
            d.Amount = +Math.round(d.Amount);
            d.year = parseDate(d.year);
        });

        // nest the entries by two levels
        dataNest = d3.nest()
            .key(function (d) {
                return d.Gas;
            })
            .entries(data);

        x.domain([d3.min(data, function (d) {return d.year;}), d3.max(data, function (d) {return d.year;})]);
        y.domain([d3.min(data, function (d) {return d.Amount;}), d3.max(data, function (d) {return d.Amount;})]);

        // define variable for transition
        var change = d3.select("#multi_linegraph").transition().duration(500);
        change.select(".y.axis").call(yAxis);
        change.select(".x.axis").call(xAxis);

        change.selectAll("path.line")
            .each(function(d, i) {
                d3.select(this)
                    .attr("d", gasline(dataNest[i].values))
                    .style("stroke", function() { return dataNest[i].color = pie_colors[dataNest[i].key]; })
            });

        // change interactive rectangle
        d3.select("rect").on("mousemove", mousemove);
    });
}

function writeTable(key){
    var index = 0;
    if (key == 'CH4') {
        index = 1;
        // d3.select('img').transition().attr('src', 'images/CH4.jpg')
    }
    else if (key == 'N2O') {
        index = 2;
        // d3.select('img').transition().attr('src', 'images/N2O.png')
    }
    else if (key == 'Rest') { exit() }
    // else { d3.select('img').transition().attr('src', 'images/CO2.png') }

    d3.select("h3#title").transition().text(' ' + title[index]);
    d3.select("td#formula").transition().text(' ' + key);
    d3.select("td#weight").transition().text(' ' + weight[index]);
    d3.select("td#properties").transition().text(' ' + properties[index]);
    d3.select("td#production").transition().text(' ' + production[index]);
    d3.select("td#role").transition().text(' ' + role[index]);
    d3.select("td#uses").transition().text(' ' + uses[index]);

    // d3.select("iframe").transition().duration(300).attr('src', image[index]);
    // d3.select("img").transition().attr('src', image2[index]);
}

function writePieTable(year, population, gdp, emission) {
    d3.select("td#year").transition().text(year);

    if (!population) {
        d3.select("td#population").transition().text("Unknown");
    }
    else if (population < 1000000) {
        d3.select("td#population").transition().text(Math.round(population / 1000) + " Thousand");
    }
    else {
        d3.select("td#population").transition().text(Math.round(population / 1000000) + " Million");
    }

    if (!gdp) {
        d3.select("td#gdp").transition().text("Unknown");
    }
    else if (gdp < 1000000) {
        d3.select("td#gdp").transition().text(Math.round(gdp / 1000) + "K");
    }
    else {
        d3.select("td#gdp").transition().text(Math.round(gdp / 1000000) + "M");
    }

    d3.select("td#emission").transition().text(Math.round(emission) + " MtCO2e");
}