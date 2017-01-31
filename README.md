# Greenhouse Gas Emission

### Laila Blömer
University of Amsterdam
StudentID: 10563865
### Minor Computer Science fall 2017 - final project

## Introduction
This repository contains a D3 visualization of greenhouse gas (GHG) emissions over time, worldwide. GHG emissions are shown in three interactive, interlinked visualizations; a Datamap showing the total GHG emissions, population and GDP per country per year, a pie chart displaying different GHG for one country, and a multi-linegraph showing emissions for one country over time. Also, additional background information is displayed in tables. 

The visualizations provide a tool into a better understanding of GHG emissions worldwide, over time and in comparison to the gross domestic product or population size. 

## Visualisations
* Worldmap (Datamaps, slider D3.v3.js)
* Piechart (donut piechart D3.v3.js)
* Linegraph (multiple lines D3.v3.js)
* Molecule (D3.v3.js)

### Worldmap
This mercator scope Datamap shows the annual GHG emissions in CO2 equivalent (CO2e) per country. Buttons on top of the worldmap allow the user to switch between datasets displaying GHG emissions, population size, and GDP. At the bottom of the map a D3 slider allows the user to look through different years from 1990 - 2012 for all three datasets. Hovering over a country will provide the viewer with that country's name. Clicking on a country will change the datasets of the piechart and linegraph. Changing the indicated year at the slider will affect the piechart and worldmap.

![alt tag](https://github.com/lailablomer/ProgrammeerProject/blob/master/doc/datamap.PNG)

### Piechart
This donut chaped piechart displays the carbon dioxide, methane, nitrous oxide and rest gas emissions of one year for one country. Next to the piechart a table displays the year, total emission (in CO2e), population size and GDP of the selected country. Hovering over the arcs of the piechart will display the percentage of the arcs' gas in the middle of the piechart, and the specific gas and exact amount (in CO2e) are added to the table. Clicking an arc of the piechart will change the other table on the html page, and display additional information about that specific gas. Also, the click event will interact with the molecule visualization.

![alt tag](https://github.com/lailablomer/ProgrammeerProject/blob/master/doc/piechart.PNG)

### Linegraph
The multi-linegraph is displayed under the worldmap, and shows the emission of different GHG's (CO2, CH4, N2O, rest) over time (1990 - 2012). Hovering over the graph will display the exact emission values in CO2e for that year. Clicking the legend entries will alter the molecule graph and change the information displayed in the table. 

![alt tag](https://github.com/lailablomer/ProgrammeerProject/blob/master/doc/linegraph.PNG)

### Molecule
As additional information, the molecules of CO2, CH4 and N2O are visualized using D3. Clicking an arc on the piechart will result in the display of the selected molecule (exect if 'Rest' is selected, which is not a molecule, but the sum of other gases emitted). The chart is interactive: the user can turn and drag the molecule by clicking and dragging it. 

![alt tag](https://github.com/lailablomer/ProgrammeerProject/blob/master/doc/molecule.PNG)

## Programming
All visualisations are in D3 version 3! Most of the styling is included in the css folder. Bootstrap was used to design the page. 


[![BCH compliance](https://bettercodehub.com/edge/badge/lailablomer/ProgrammeerProject)](https://bettercodehub.com)
