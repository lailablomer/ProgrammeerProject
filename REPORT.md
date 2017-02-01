# Report
Laila Blömer </br>
University of Amsterdam </br>
studentID: 10563865 </br>
Computer Science Fall 2017 </br>

## Introduction
This computer science project shows the greenhouse gas (GHG) emission world wide in the period 1990 - 2012. The interactive visualisations enable the user to look at the specific gasses per country per year (in a piechart and table), to compare the gas emission with population size and gross domestic product, and to see the gas emission changing over time (in a linegraph). As an extra, additional information about the specific gasses is displayed in a table and molecule graph.

![alt tag](https://github.com/lailablomer/ProgrammeerProject/blob/master/doc/GHGEmission.PNG)

The 'story' the data visulisations tell start with the worldmap. This displays the GHG emission. Clicking a country will alter the other visualisations.

### Worldmap
This mercator scope Datamap shows the annual GHG emissions in CO2 equivalent (CO2e) per country. Buttons on top of the worldmap allow the user to switch between datasets displaying GHG emissions, population size, and GDP. At the bottom of the map a D3 slider allows the user to look through different years from 1990 - 2012 for all three datasets. Hovering over a country will provide the viewer with that country's name. On hoverover a popup shows the name of the country. On click, the piechart and linegraph change. The changes have a duration of 200 ms, to make the transition look smooth. Changing the indicated year at the slider will affect the piechart and worldmap. 

The world map is coloured by GHG emission. This is displayed in shades of red. Red is associated with danger, as are GHG emissions. The population is displayed in blue, a more natural and neutral color. GDP is displayed in green, since green is 'the money's color'. Of course, the buttons that allow the user to switch between GHG emissions, GDP and population size have the same colors.

### Piechart
This donut chaped piechart displays the carbon dioxide, methane, nitrous oxide and rest gas emissions of one year for one country. Next to the piechart a table displays the year, total emission (in CO2e), population size and GDP of the selected country. Hovering over the arcs of the piechart will display the percentage of the arcs' gas in the middle of the piechart (in the same color as the corresponding arc), and the specific gas and exact amount (in CO2e) are added to the table. Clicking an arc of the piechart will change the other table on the html page, and display additional information about that specific gas. Also, the click event will interact with the molecule visualization.

### Linegraph
The multi-linegraph is displayed under the worldmap, and shows the emission of different GHG's (CO2, CH4, N2O, rest) over time (1990 - 2012). Hovering over the graph will display the exact emission values in CO2e for that year. The coloring of the different lines match the coloring of the arcs in the piechart. Clicking the legend entries will alter the molecule graph and change the information displayed in the table. 

### Molecule
As additional information, the molecules of CO2, CH4 and N2O are visualized using D3. Clicking an arc on the piechart or a gas in the linegraph's legend will result in the display of the selected molecule (exect if 'Rest' is selected, which is not a molecule, but the sum of other gases emitted). The chart is interactive: the user can turn and drag the molecule by clicking and dragging it.

## Technical design
The repository contains an index.html to load the page. All the other code is distributed in a couple of folders:
* script: folder contains python files needed to format the data from csv to json.
* javascript: contains all javascript files.
* css: contains all the stylesheets.
* doc: contains all images used. 

### HTML
index.html contains all html code from the project. In the head the title of the page is defined, all the stylesheets are loaded in, as well as d3.v3, bootstrap and jQuery javascript files.

The body tag contains a container with the design structure of the page. This placements of the elemements is done with bootstrap. Below the container my javascript files are linked.

### Javascript 
The javascript folder contains eight files; three external libraries (jQuery, Bootstrap and the D3 slider code) and five files containing my personal code. 

* main.js: The main file sets the initial variables for the visualizations, and calls the initial graphs. Also, the interactivity of the slider and buttons are defined here.
* worldmap.js: This file contains the initial variables for the worldmap, such as the color coding and legend labels. A new Datamap is created here, and filled with data. Lastly, the slider element is created and edited. 
* linegraph.js: Contains all the variables for the linegraph, calls the first linegraph, and sets the variables for the interactive element. 
* molecule.js: contains the information displayed in the gas-table and the initial variables needed to call the molecule graph. 

#### functions.js
The functions script contains all functions to call and re-draw graphs, change information displayed in tables and coordinate interactivity. 

* drawWorldMap: takes a country ID and year to fill the worldmap with data. This function calls the setFillKey() function to update the fillkeys and fillcolors in the data array, and updates the choropleth of the datamap. Also, this function changes the worldmaps legend.
* setFillKey: changes fillKey and -Color according to the selected button (GHG emission, population, or GDP).## 
* worldMapClick: this function calls other functions when a country on the worldmap is clicked; the right dataset is selected and passed on to the piechart. Also the information displayed in the pie-table is changed. Lastly the linegraph is changed to display the countries' selected data.
* pie: contains the initial piechart variables. If the svg already exists, the function alters the arcs with the data passed on with the function. Otherwise, the piechart is created. 
* nestData: nests data with gas as key and resets the x and y domain of the linegraph.
* firstLineGraph: draws the initial linegraph, and adds interactive elements.
* drawLineGraph: re-draws linegraph when worldmap is clicked. 
* mousemove: enables tooltip over the linegraph. The function retrieves the data and displays it in a box over the linegraph. Also, crosshairs are positioned.
* writeTable: fills the gas-table with information
* writePieTable: fills the pie-table with information
* updateLabels: this function checks whether the labels with the piechart overlap, and moves them if they do.
* changeMolecule: deteles nodes and links from the molecule graph and re-draws the graph on click. 

### CSS
There are eight stylesheets in the css folder. Three of these are external libraries and contain styling for the Bootstrap and D3 slider. The remaining five contain main styling for the whole page (main.css), and styling per visualization. This means the worldmap, linegraph, piechart and molecule graph have their own stylesheets.

### External libraries
External libraries used, all local copies:
* D3 version 3
* Topojson
* Datamaps
* jQuery
* Bootstrap
* D3.slider

Local copies have the advantage that they still work even when your network is down. The downside is that they take memory. Because I worked on the project also without WiFi I needed local copies of the used libraries. 

## Challenges
