/**
 * Programmeer Project
 *
 * Laila Blömer
 * 10563865
 *
 * functions.js contains all update- and draw graph- functions
 */

// draw and update worldmap
function drawWorldMap(id, year) {
    d3.json("scripts/data_file.json", function(error, data) {
        if (error) throw error;
        // select right year from json
        data = data[year];

        if (id == "button_GHG") {
            worldmap_colors = GHG_colors;
            legend = legend_total[0];
        }
        else if (id == "button_Population") {
            worldmap_colors = population_colors;
            legend = legend_total[1];
        }
        else {
            worldmap_colors = GDP_colors;
            legend = legend_total[2];
        }

        // change fillKeys and fillColors
        setFillKey(data, id);

        // update Datamap coloring
        map.updateChoropleth(data);

        // remove and re-draw legend
        d3.select(".datamaps-legend").remove();
        map.legend(legend);

        // update coloring of legend
        d3.selectAll(".datamaps-legend dd")
            .each(function(d, i) {
                d3.select(this)
                    .style("background-color", worldmap_colors[i])
            });
    });
}

// loops through one-year data and changes fillKey and -Color according to id
function setFillKey(data, id) {
    for (country_key in data) {
        if ((!data[country_key]['GHG'] && id == 'button_GHG') ||
                (!data[country_key]['population'] && id == "button_Population") ||
                (!data[country_key]['GDP'] && id == "button_GDP")) {
            data[country_key].fillColor = "grey";
        }

        else if ((data[country_key]['GHG'] > 4000 && id == 'button_GHG') ||
                (data[country_key]['population'] > 250000000 && id == "button_Population") ||
                (data[country_key]['GDP'] > 10000000 && id == "button_GDP")) {
            data[country_key].fillKey = 'A';
            data[country_key].fillColor = worldmap_colors[5]
        }

        else if ((data[country_key]['GHG'] > 1000 && id == 'button_GHG') ||
                (data[country_key]['population'] > 50000000 && id == "button_Population") ||
                (data[country_key]['GDP'] > 1000000 && id == "button_GDP")) {
            data[country_key].fillKey = 'B';
            data[country_key].fillColor = worldmap_colors[4]
        }

        else if ((data[country_key]['GHG'] > 500 && id == 'button_GHG') ||
                (data[country_key]['population'] > 25000000 && id == "button_Population") ||
                (data[country_key]['GDP'] > 500000 && id == "button_GDP")) {
            data[country_key].fillKey = 'C';
            data[country_key].fillColor = worldmap_colors[3]
        }

        else if ((data[country_key]['GHG'] > 100 && id == 'button_GHG') ||
                (data[country_key]['population'] > 10000000 && id == "button_Population") ||
                (data[country_key]['GDP'] > 100000 && id == "button_GDP")) {
            data[country_key].fillKey = 'D';
            data[country_key].fillColor = worldmap_colors[2]
        }

        else if ((data[country_key]['GHG'] > 50 && id == 'button_GHG') ||
                (data[country_key]['population'] > 5000000 && id == "button_Population") ||
                (data[country_key]['GDP'] > 50000 && id == "button_GDP")) {
            data[country_key].fillKey = 'E';
            data[country_key].fillColor = worldmap_colors[1]
        }

        else {
            data[country_key].fillKey = 'F';
            data[country_key].fillColor = worldmap_colors[0]
        }
    }
}

// update pie chart, linegraph, info tables on click
function worldMapClick(year, country_id) {
    d3.json("scripts/data_file.json", function(error, data) {
        if (error) throw error;
        // select right year from json
        data = data[year];

        // update pie chart
        chart.data(getData(data, country_id)).render();
        d3.select("#pie-row").transition().duration(500)
            .select("h3")
            .text(data[country_id].country);

        // update table information with pie chart
        writePieTable(year, data[country_id].population, data[country_id].GDP, data[country_id].GHG);

        map.svg.selectAll('.datamaps-subunit').on('click', function (d) {
            country_id = d.id;

            // update pie chart
            chart.data(getData(data, country_id)).render();
            d3.select("#pie-row").transition().duration(500)
                .select("h3")
                .text(data[country_id].country);

            // update linegraph
            d3.select("#multi_linegraph").transition().duration(500)
                .select("h3#linegraph-title")
                .text(data[country_id].country);
            drawLinegraph(d.id);

            // update table information with pie chart
            writePieTable(year, data[country_id].population, data[country_id].GDP, data[country_id].GHG);
        });
    });
}

// draws and updates pie chart
function pie(){
    // default settings
    var $el = d3.select("#pie");
    var data = {};
    var width = 300,
        height = 300,
        radius = Math.min(width - 100, height) / 2,
        textOffset = 14;

    // color array
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var svg, g, arc;
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
                    return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2))
                        * (radius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2)
                        * (radius + textOffset) + ")"; })
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

            // update labels
            updateLabels(labels);

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
            labels = g.select("text")
                .attr("transform", function(d) { return "translate("
                    + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2))
                    * (radius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2)
                    * (radius + textOffset) + ")"; });

            // update labels
            updateLabels(labels);

            // update tooltip
            svg.select("text.text-tooltip").datum(data);
        }
        return object;
    };

    // returning standard values for piechart
    object.data = function(value){
        pie_data = parseInt(value["CO2"])
            + parseInt(value["CH4"])
            + parseInt(value["N2O"])
            + parseInt(value["Rest"]);
        if (!arguments.length) return data;
            data = value;
            return object; };

    object.$el = function(value){
        if (!arguments.length) return $el;
            $el = value;
            return object; };

    object.width = function(value){
        if (!arguments.length) return width;
            width = value;
            radius = Math.min(width, height) / 2;
            return object; };

    object.height = function(value){
        if (!arguments.length) return height;
            height = value;
            radius = Math.min(width, height) / 2;
            return object; };

    return object;
}

// nest data for linegraph
function nestData(data) {
    data.forEach(function (d) {
        d.Amount = +Math.round(d.Amount);
        d.year = parseDate(d.year);
    });

    // nest the entries
    dataNest = d3.nest()
        .key(function (d) {
            return d.Gas;
        })
        .entries(data);

    // set x and y domain
    x.domain([d3.min(data, function (d) {return d.year;}), d3.max(data, function (d) {return d.year;})]);
    y.domain([d3.min(data, function (d) {return d.Amount;}), d3.max(data, function (d) {return d.Amount;})]);
}

// draws and updates linegraph
function drawLinegraph(id) {
    d3.json('scripts/data_linegraph.json', function(error, data) {
        if (error) throw error;

        for (var key in data) {
            if (key == id) {
                data = data[key]; }
        }

        // nest data
        nestData(data);

        // define variable for transition
        var change = d3.select("#multi_linegraph").transition().duration(500);
        change.select(".y.axis").call(yAxis);
        change.select(".x.axis").call(xAxis);

        change.selectAll("path.line")
            .each(function(d, i) {
                d3.select(this)
                    .transition().duration(500)
                    .attr("d", gasline(dataNest[i].values))
                    .style("stroke", function() { return dataNest[i].color = pie_colors[dataNest[i].key]; })
            });

        // change interactive rectangle
        d3.select("rect").on("mousemove", mousemove);
    });
}

// displays tooptip with linegraph
function mousemove() {
    for (j = 0; j < 4; j++) {
        var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(dataNest[j].values, x0, 1),
        d0 = dataNest[j].values[i - 1],
        d1 = dataNest[j].values[i],
        d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        if (j == 0) {
            // transform position crosshair
            crosshairCO2.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
            crosshairCO2.select(".xline").attr("y1", y(d.Amount) * -1).attr("y2", height - y(d.Amount));

            // call tooltip and fill with crosshair info
            tooltip.transition().duration(200)
                .style("opacity", .8);
            tooltip.html("CO2: " + d.Amount + " MtCO2e" +
                "<br/><br/>" + "CH4: " + dataNest[1].values[i].Amount + " MtCO2e" +
                "<br/><br/>" + "N2O: " + dataNest[2].values[i].Amount + " MtCO2e" +
                "<br/><br/>" + "Rest: " + dataNest[3].values[i].Amount + " MtCO2e")
                .style("left", (d3.event.pageX) + "px")
                .style("top", 100 + 'px');
        }

        else if (j == 1) {
            // transform position crosshair
            crosshairCH4.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
        }
        else if (j == 2) {
            crosshairN2O.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
        }
        else {
            crosshairRest.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
        }

        // change y line of crosshair
        d3.selectAll(".crosshair").select(".yline").attr("x1", x(d.year) * -1).attr("x2", width - x(d.year));
    }
}

// write information table
function writeTable(key){
    var index = 0;

    // get index for table info
    if (key == 'CH4') {
        index = 1;
    }
    else if (key == 'N2O') {
        index = 2;
    }
    else if (key == 'Rest') { exit() }

    // change table text
    d3.select("h3#title").transition().text(title[index]);
    d3.select("td#formula").transition().text(key);
    d3.select("td#weight").transition().text(weight[index]);
    d3.select("td#properties").transition().text(properties[index]);
    d3.select("td#production").transition().text(production[index]);
    d3.select("td#role").transition().text(role[index]);
    d3.select("td#uses").transition().text(uses[index]);
}

// write table displaying pie info per year
function writePieTable(year, population, gdp, emission) {
    d3.select("td#year").transition().text(year);

    // change population size
    if (!population) {
        d3.select("td#population").transition().text("Unknown");
    }
    else if (population < 1000000) {
        d3.select("td#population").transition().text(Math.round(population / 1000) + " Thousand");
    }
    else {
        d3.select("td#population").transition().text(Math.round(population / 1000000) + " Million");
    }

    // change GDP amount
    if (!gdp) {
        d3.select("td#gdp").transition().text("Unknown");
    }
    else if (gdp < 1000000) {
        d3.select("td#gdp").transition().text(Math.round(gdp / 1000) + "K");
    }
    else {
        d3.select("td#gdp").transition().text(Math.round(gdp / 1000000) + "M");
    }

    // change emission
    d3.select("td#emission").transition().text(Math.round(emission) + " MtCO2e");
}

// update pie labels
function updateLabels(labels) {
    var textOffset = 14,
        radius = Math.min(width - 400, height) / 2,
        prev;

    // for each label, check if it overlaps with another label
    labels.each(function(d, i) {
        var prevbb = this.getBoundingClientRect();
        var thisbb = this.getBoundingClientRect();

        if(i > 0) {
            thisbb = this.getBoundingClientRect();
            prevbb = prev.getBoundingClientRect();

            // if (i == 3){
            //     thisbb = first;
            //     prevbb = this.getBoundingClientRect()
            // }
        }

        // move if they overlap
        if(!(thisbb.right < prevbb.left || thisbb.left > prevbb.right ||
                thisbb.bottom < prevbb.top || thisbb.top > prevbb.bottom)) {
            var ctx = thisbb.left + (thisbb.right - thisbb.left)/2,
                cty = thisbb.top + (thisbb.bottom - thisbb.top)/2,
                cpx = prevbb.left + (prevbb.right - prevbb.left)/2,
                cpy = prevbb.top + (prevbb.bottom - prevbb.top)/2,
                off = Math.sqrt(Math.pow(ctx - cpx, 2) + Math.pow(cty - cpy, 2))/2;

            // move label
            d3.select(this).attr("transform", "translate(" + Math.cos(((d.startAngle
                + d.endAngle - Math.PI) / 2)) * (radius + textOffset + off) + ","
                + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset + off) + ")"); }

        prev = this;
    });
}

// draw and update molecule chart
function changeMolecule(gas) {
    var mol = '';

    // select molecule json
    if (gas == 'CO2') {
        mol = 'scripts/co2.json';
    }
    else if (gas == 'CH4') {
        mol = 'scripts/ch4.json';
    }
    else {
        mol = 'scripts/n2o.json';
    }

    // remove previous molecule
    d3.selectAll(".link").remove();
    d3.selectAll(".node").remove();

    d3.json(mol, function(error, graph) {
        if (error) throw error;

        // group the data
        force
            .nodes(graph.nodes)
            .links(graph.links)
            .on("tick", tick)
            .start();

        // define new links
        var link = molecule.selectAll(".link")
            .data(graph.links)
            .enter().append("g")
                .attr("class", "link");

        // draw bondings of molecules
        link.append("line")
            .style("stroke-width", function(d) { return (d.bond * 2 - 1) * 2 + "px"; });

        link.filter(function(d) { return d.bond > 1; }).append("line")
            .attr("class", "separator");

        // define new nodes
        var node = molecule.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
                .attr("class", "node")
                .call(force.drag);

        // draw atoms
        node.append("circle")
            .attr("r", function(d) { return radius(d.size); })
            .style("fill", function(d) { return color(d.atom); });

        // add label
        node.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.atom; });

        // make molecule draggable
        function tick() {
            link.selectAll("line")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        }
    });
}
