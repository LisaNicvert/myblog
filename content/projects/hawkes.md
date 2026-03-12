---
title: "Attraction-repulsion inference in camera traps"
description: "Using a point process to infer interactions"
featured_image: images/hawkes.jpg
institution: LBBE
date: "2020-01-01"
project_end: 2024
---

This project, completed during my PhD, aimed at inferring interactions between species from camera trap data. For this, I used a multivariate Hawkes process. This point process allows to derive interaction functions between species pairs, where the intensity of interaction is a function of the time elapsed since the first species' occurrence.

These results have been published in [an article](/pdf/nicvert_using_2024.pdf) and are explored more in-depth in [my PhD thesis](/pdf/nicvert_statistical_2024.pdf). We demonstrated the relevance of the Hawkes process to analyze ecological data using simulated data with realistic ecological parameters. Then, we analyzed patterns of attraction-avoidance between five species of African mammals, and notably find that zebras and impalas seem to avoid lions, while zebra and impala attract all other herbivores, and wildebeest attracts zebra.

The Hawkes process is highly relevant for interactions inference from camera trap data, but
it would benefit from methodological developments allowing to include covariates in the model to make this model more widely applicable.