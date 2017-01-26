/**
 * Created by Gebruiker on 20/01/2017.
 */

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

// d3.json('scripts/co2.json', function(error, graph) {
//     if (error) throw error;
//
//     force
//         .nodes(graph.nodes)
//         .links(graph.links)
//         .on("tick", tick)
//         .start();
//
//     var link = molecule.selectAll(".link")
//         .data(graph.links)
//         .enter().append("g")
//             .attr("class", "link");
//
//     link.append("line")
//         .style("stroke-width", function(d) { return (d.bond * 2 - 1) * 2 + "px"; });
//
//     link.filter(function(d) { return d.bond > 1; }).append("line")
//         .attr("class", "separator");
//
//     var node = molecule.selectAll(".node")
//         .data(graph.nodes)
//         .enter().append("g")
//             .attr("class", "node")
//             .call(force.drag);
//
//     node.append("circle")
//         .attr("r", function(d) { return radius(d.size); })
//         .style("fill", function(d) { return color(d.atom); });
//
//     node.append("text")
//         .attr("dy", ".35em")
//         .attr("text-anchor", "middle")
//         .text(function(d) { return d.atom; });
//
//     function tick() {
//         link.selectAll("line")
//             .attr("x1", function(d) { return d.source.x; })
//             .attr("y1", function(d) { return d.source.y; })
//             .attr("x2", function(d) { return d.target.x; })
//             .attr("y2", function(d) { return d.target.y; });
//
//         node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//     }
// });


