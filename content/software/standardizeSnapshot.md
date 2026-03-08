---
title: "standardizeSnapshot"
description: 'R package to clean camera trap data.'
year: 2024
source: https://github.com/SnapshotSafari/standard-merge
featured_image: "images/software/standardizeSnapshot-workflow.png"
---

{standardizeSnapshot} is a R package to standardize camera trap data. It was
created as part of the [Snapshot Safari](https://snapshotsafari.wordpress.com/) project during my PhD (2023-2024).

### Aim
This package allows to (1) standardize column names and format and (2) 
clean data stored in columns. These operations are possible with the two main
functions:

- `standardize_snapshot_df` to standardize one file
- `standardize_snapshot_list` to standardize multiple file

!["{standardizeSnapshot} workflow"](/images/software/standardizeSnapshot-workflow.png)

Due to the large amount of data processed within the project, and to the fact that different tools were historically used for annotation, there was a need for an automated tool to process data.

### Resources
Package documentation can be found [here](https://snapshotsafari.github.io/standard-merge/) and source code is available [here](https://github.com/SnapshotSafari/standard-merge).