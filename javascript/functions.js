
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

            updateLabels(labels);

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
            labels = g.select("text")
                .attr("transform", function(d) { return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * (radius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset) + ")"; });

            updateLabels(labels);

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
        d3.select("#pie-row").transition().duration(500).select("h3").text(data[country_id].country);
        writePieTable(year, data[country_id].population, data[country_id].GDP, data[country_id].GHG);

        map.svg.selectAll('.datamaps-subunit').on('click', function(d) {
            country_id = d.id;
            d3.select("#pie-row").transition().duration(500).select("h3").text(data[country_id].country);
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
            // focusCH4.select("text#infoCH4.infotext").text("CH4: " + d.Amount + " MtCO2e");
            // focusCH4.select("text#infoCH4.infotextpath").text("CH4: " + d.Amount + " MtCO2e");
        }
        else if (j == 2) {
            // transform position crosshair
            focusN2O.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
            // display text
            // focusN2O.select("text#infoN2O.infotext").text("N2O: " + d.Amount + " MtCO2e");
            // focusN2O.select("text#infoN2O.infotextpath").text("N2O: " + d.Amount + " MtCO2e");
        }
        else {
            // transform position crosshair
            focusRest.attr("transform", "translate(" + x(d.year) + "," + y(d.Amount) + ")");
            // display text
            // focusRest.select("text#infoRest.infotext").text("Rest: " + d.Amount + " MtCO2e");
            // focusRest.select("text#infoRest.infotextpath").text("Rest: " + d.Amount + " MtCO2e");
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

function updateLabels(labels) {
    var textOffset = 14,
        radius = Math.min(width - 400, height) / 2,
        prev;

    labels.each(function(d, i) {
        if(i > 0) {
            var thisbb = this.getBoundingClientRect(),
                prevbb = prev.getBoundingClientRect();
            // move if they overlap
            if(!(thisbb.right < prevbb.left || thisbb.left > prevbb.right ||
                    thisbb.bottom < prevbb.top || thisbb.top > prevbb.bottom)) {
                var ctx = thisbb.left + (thisbb.right - thisbb.left)/2,
                    cty = thisbb.top + (thisbb.bottom - thisbb.top)/2,
                    cpx = prevbb.left + (prevbb.right - prevbb.left)/2,
                    cpy = prevbb.top + (prevbb.bottom - prevbb.top)/2,
                    off = Math.sqrt(Math.pow(ctx - cpx, 2) + Math.pow(cty - cpy, 2))/2;

                d3.select(this).attr("transform", "translate(" + Math.cos(((d.startAngle
                    + d.endAngle - Math.PI) / 2)) * (radius + textOffset + off) + ","
                    + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset + off) + ")");
            }
        }
        prev = this;
    });
}

function changeMolecule(gas) {
    var mol = '';
    if (gas == 'CO2') {
        mol = 'scripts/co2.json';
    }
    else if (gas == 'CH4') {
        mol = 'scripts/ch4.json';
    }
    else {
        mol = 'scripts/n2o.json';
    }

    d3.selectAll(".link").remove();
    d3.selectAll(".node").remove();

    d3.json(mol, function(error, graph) {
        if (error) throw error;

        force
            .nodes(graph.nodes)
            .links(graph.links)
            .on("tick", tick)
            .start();

        var link = molecule.selectAll(".link")
            .data(graph.links)
            .enter().append("g")
                .attr("class", "link");

        link.append("line")
            .style("stroke-width", function(d) { return (d.bond * 2 - 1) * 2 + "px"; });

        link.filter(function(d) { return d.bond > 1; }).append("line")
            .attr("class", "separator");

        var node = molecule.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
                .attr("class", "node")
                .call(force.drag);

        node.append("circle")
            .attr("r", function(d) { return radius(d.size); })
            .style("fill", function(d) { return color(d.atom); });

        node.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.atom; });

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
