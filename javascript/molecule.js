/**
 * Programmeer Project
 *
 * Laila Blömer
 * 10563865
 *
 * molecule.js initialize molecule variables and information table
 */

// information table data
var title = ["Carbon Dioxide", "Methane", "Nitrous Oxide"];
var properties = ["Carbon dioxide is colorless. At low concentrations, the gas is odorless. At higher concentrations it has a sharp, acidic odor.",
    "Methane is a tetrahedral molecule with four equivalent C–H bonds. At room temperature and standard pressure, methane is a colorless, odorless gas.",
    "At room temperature, it is a colorless, odorless non-flammable gas, with a slightly sweet taste."];
var production = ["The combustion of all carbon-based fuels produces carbon dioxide. Also, all aerobic organisms produce CO2 when they oxidize carbohydrates, fatty acids, and proteins.",
    "Natural methane is found both below ground and under the sea floor. When it reaches the surface and the atmosphere, it is known as atmospheric methane. Naturally occurring methane is mainly produced by the process of methanogenesis. This multistep process is used by microorganisms as an energy source. ",
    "The production of adipic acid is the largest source to nitrous oxide. It specifically arises from the degradation of the nitrolic acid intermediate derived from nitration of cyclohexanone."];
var uses = ["Carbon dioxide is used by the food industry, the oil industry, and the chemical industry.",
    "Methane is used in industrial chemical processes and may be transported as a refrigerated liquid (liquefied natural gas, or LNG). ",
    "It is used in surgery and dentistry for its anaesthetic and analgesic effects. It is known as 'laughing gas' due to the euphoric effects of inhaling it, a property that has led to its recreational use as a dissociative anaesthetic. It is also used as an oxidizer in rocket propellants, and in motor racing to increase the power output of engines."];
var role = ["Carbon dioxide is an end product of cellular respiration in organisms that obtain energy by breaking down sugars, fats and amino acids with oxygen as part of their metabolism",
    "Methane as natural gas has been so abundant that synthetic production of it has been limited to special cases and as of 2016 covers only minor fraction of the methane used.",
    "The pharmacological mechanism of action of N2O in medicine is not fully known. However, it has been shown to directly modulate a broad range of ligand-gated ion channels (in the brain), and this likely plays a major role in many of its effects."];
var weight = ["44.009 g/mol", "16.04246 g/mol", "44.0128 g/mol"];

// initialize variables molecule
var width_mol = 530,
    height_mol = 200;

var color = d3.scale.category20();

var radius = d3.scale.sqrt()
    .range([0, 6]);

// initialize canvas
var molecule = d3.select("svg#molecule")
    .attr("width", width_mol)
    .attr("height", height_mol);

var force = d3.layout.force()
    .size([width_mol, height_mol])
    .charge(-400)
    .linkDistance(function(d) { return radius(d.source.size) + radius(d.target.size) + 20; });
