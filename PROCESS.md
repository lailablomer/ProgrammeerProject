# day 1
Trying to come up with an idea..

# day 2
Developing the plan to display information about an experiment with mice. In this experiment different cellular types in different parts of the cortex (brain) are colored. Also, the activity of these cells is recorded while presenting the mice with different visual stimuli. 

# day 3
Trying to get the full dataset of the experiment. After receiving the data, formatting into understandable json.

# day 4
Giving up on project00, trying to come up with project01. Eventually I was done with trying to find fancy topics, but decided I will make fancy visualizations instead. 

# day 5
Greenhouse gas emissions it is!
* Downloading the datasets. Building a csv-to-json converter in Python
* First visualization: worldmap displaying GHG emissions per country

# day 6
* Inspired by the friday presentations, changed the csv-json converter to get a better json format. 
* Adding three buttons to the worldmap, so switching between GHG emissions, GDP and population size is possible. 

# day 7
* Trying to add a legend to the worldmap, which is difficult because of the three different datasets used for the coloring of the Datamap, but especially because the colors for all three datasets are different. 
* Adding second visualisation: multi-linegraph, and the interaction between the two. 

# day 8
* Adding piechart
* Adding slider
* fixing links between piechart and worldmap & slider. 

# day 9
* Positioning everything on the html page.
* Cleaning up my code, writing functions for all interactivity and on-click events. 

# day 10
* Adding tables to the page for additional information. 
* Adding pictures of the different GHG's. 
* Interactive element which switches the structure formula images and table information on clicking the piechart. 

# day 11
* Inspired by the friday presentations, adding the molecule chart instead of a simple picture

# day 12
* changing fillKeys of the worldmap to fillColors, and finally fixing the legend. Eventually I ended up changing the colors of the legend using d3.select().
* Trying to fix my scaling problem with Bootstrap, but it doesn't seem to be working with svg's. 

# day 13
Fixing bugs!
* The annoying ',' seperator in the years at my slider are gone!
* Arc labels of the piechart do not overlap anymore
* Hoverover elements of the linegraph do not overlap anymore; I changed the crosshair-text to be displayed in a rectangle at a constant x-value (instead of being displayed at the actual datapoint)

# day 14
* Fixing bootstrap > making better use of rows and columns, this fixes most of the scaling problem. 
* Cleaning up code: different stylesheets for the different columns on the page, and creating a separate js file with functions.
* on-click event in the linegraph: clicking a gas in the legend will change the information displayed in the info table, and the molecule visualization.

# day 16
Cleaning up code, and checking with Better Code Hub:
* Too long files are divided in two or more,
* re-writing function drawWorldMap()
* deleting unnessecary comments, and out-commented code
