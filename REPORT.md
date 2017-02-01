# Report
Laila Blömer
University of Amsterdam
studentID: 10563865
Computer Science Fall 2017

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

The body tag contains a container with the design structure of the page. This placements of the elemements is done with bootstrap. Below the container my javascript scripts are linked. 

### External libraries 


### Javascript


### CSS

