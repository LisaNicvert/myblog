---
title: "Attraction-repulsion inference in camera traps"
description: "Using a point process to infer interactions"
featured_image: images/hawkes.jpg
institution: LBBE
date: "2020-01-01"
project_end: 2024
---

This article models species occurrences at camera traps as a multivariate Hawkes process (MHP). The MHP allows to derive interaction functions between species pairs, where the intensity of interaction is a function of the time elapsed since the first species' occurrence. In our framework, these interactions can be positive or negative, are asymmetrical and non-parametric.

In this article, we present a proof-of-concept of the MHP on simulated and real data. We notably find interesting patterns of attraction-avoidance between five species of African mammals: zebras and impalas seem to avoid lions, while zebra and impala attract all other herbivores, and wildebeest attracts zebra.

I think the MHP is relevant to think about interactions inferred from camera trap data. It may not be widely applicable yet, because of methodological limitations and (relative) data scarcity, but I hope these limitations can be overcome in the near future.