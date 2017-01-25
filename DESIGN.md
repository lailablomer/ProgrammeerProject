# Design
* Laila Blömer 
* 10563865
* Bèta Gamma Bachelor
* Minor Programmeren fall 2017

# Graphs
* Worldmap: with GHG emissions per country
* Piechart: with CO2, CH4, N2O, and rest gas emissions
* Linegraph: with GHG emissions from 1950 till 2012
* Molecule: displaying chemical structure of CO2, CH4 or N2O.

## Worldmap
On hoverover a popup shows the name of the country. On click, the piechart and linegraph change. The changes have a duration of 200 ms, to make the transition look smooth.

The world map is coloured by GHG emission. This is displayed in shades of red. Red is associated with danger, as are GHG emissions. The population is displayed in blue, a more natural and neutral color. GDP is displayed in green, since green is 'the money's color'. Of course, the buttons that allow the user to switch between GHG emissions, GDP and population size have the same colors. 

## Piechart
Diplays the different gases emitted by a country. On hover, the percentage of that gas from the total. The percetage is displayed in the same color as the corresponding arc. 

## Linegraph
GHG emission over time (1950 - 2012). On hovering over the graph, a crosshair will appear and exact GHG amounts are displayed. The coloring of the different lines match the coloring of the arcs in the piechart. 

# Bootstrap
Bootstrap is used to:
* fix the width of the div's on the page,
* scaling of the div's when resizing the page,
* set all fonts to be the same,
* styling tables

# HTML
The html page will contain a header (with title), footer (with my name, student number), and container (div containing all other elements). In the container div all other div's will be named, according to:
* div for the worldmap (in svg), containing:
+ svg with Datamap
+ D3 slider (div)
+ Three buttons
* div for the piechart, with:
+ svg for piechart
+ Table with country information
* div for linegraph:
+ svg for multi-linegraph
* div for additional information
+ svg with molecule graph
** Table with gas information
