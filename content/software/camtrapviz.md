---
title: "Camtrapviz"
description: 'Shiny app and R package to visualize camera trap data'
date: 2024-07-08
---

!["Overview of the {camtrapviz} interface"](/software/images/camtrapviz-shinyapp.png)

### Aim
{camtrapviz} is a R and Shiny package to visualize and summarize camera trap data. 
It is intended for camera trap data where species have already been tagged and 
compiled in tables. 

### Context
I developed this tool during my PhD (2023-2024). 
As camera trap data mobilizes people with different backgrounds, not all
are trained in data analysis and familiar with coding. In this context, an interactive 
tool is especially relevant. But as reproducibility of the analysis is also crucial, 
all the code run interactively within the Shiny app
can be reproduced (thanks to the {[shinymeta](https://rstudio.github.io/shinymeta/)} package).

### Organization

{camtrapviz} is organized in 5 modules:

- Import: import CSV data files
- Filter: filter data based on dates, species or custom filters
- Overview: synthetic information on the data
- All species: get diversity and abundance information
- One species: get activity and detection patterns for selected species

!["{camtrapviz} modules"](/software/images/camtrapviz-modules.png)

### Resources
The Shiny application is live [here](https://lbbe-shiny.univ-lyon1.fr/camtrapviz/).

Source code is hosted on [GitHub](https://github.com/LisaNicvert/camtrapviz).
and the package documentation can be found [here](https://lisanicvert.github.io/camtrapviz/).