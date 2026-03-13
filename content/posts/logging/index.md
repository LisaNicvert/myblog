---
title: Logging in R
description: Tips and tricks using the {logger} package
author: Lisa Nicvert
date: '2026-03-09'
draft: true
featured_image: images/logger.jpg
tags:
  - R
  - reproducibility
---


<img src="/images/logger.jpg" alt="Logs">
<figcaption>
A stack of logs by Walter Baxter, <a href="https://creativecommons.org/licenses/by-sa/2.0" title="Creative Commons Attribution-Share Alike 2.0">CC BY-SA 2.0</a> (<a href="https://commons.wikimedia.org/w/index.php?curid=144470224">Link</a>)
</figcaption>

## Introduction

### What is logging?

In computer science, **logging** is the practice of keeping track of some events occurring while the code runs[^1].

These outputs (called *logs*) are most often written to a text file (*logfile*), which has the .log extension by convention.

### Why to log

Logging allows to keep track of events in a permanent way that's not going to be erased (like console outputs) or forgotten (like your memory).

I find logging particularly useful to keep track of:

1.  **Errors/warnings.** Sometimes, code can run in an unexpected manner, and logs are useful to determine why and how this happened.
2.  **Metadata about your environment/setup.** For example, I use it to record how long a bit of code ran, or which arguments I used.

### When to log

Logging is useful primarily for scripts that you don't monitor when they run (scripts that are long to run, or a series of short, but numerous numerous scripts).

## Logging in base R

To write a logfile, the simplest option is just to use base R functions:

``` r
# Create a log file and a file connection
logfile <- tempfile(fileext = ".log")
logfile_con <- file(logfile, open = "a")

# Write things to the logger
writeLines("Start analyses", con = logfile_con)
res <- 40 + 2
writeLines(paste("res is", res), con = logfile_con)
writeLines("End analyses", con = logfile_con)
close(logfile_con)
```

Let's inspect the logfile:

``` r
# Show contents of the logfile
cat(readLines(logfile), sep = "\n")
```

    Start analyses
    res is 42
    End analyses

This approach is sometimes enough, but there are packages out there that allow to make things more flexible and easy for us on the user end.

## The {logger} package

One of them is {logger}. It is very complete and flexible, but at the same time I find it simple to use. This package allows you to:

-   define a [log level](https://daroczig.github.io/logger/reference/log_levels.html) for your messages (e.g. INFO, WARN, DEBUG)
-   prefix log messages with a predefined sequence (by default, log level and date)
-   log to different streams (file(s), console, and many others discussed below)
-   log errors, warnings and messages easily (see [below](#logging-warnings-errors-and-messages))

## Basic logger

The first step is to initialize the logger using the `log_appender` function. Here, we set the `appender` argument with an `appender_file()` function. The {logger} package also comes with many [other appenders](https://daroczig.github.io/logger/reference/index.html#appenders) allowing to log to console, Slack channel, Telegram group chat...

We also define a logging level with `log_threshold(DEBUG)`. Here, all messages above the `DEBUG` level will be logged (see the list and order of levels [here](https://daroczig.github.io/logger/reference/log_levels.html)).

``` r
library(logger)

# Create logger
logfile <- tempfile(fileext = ".log")
log_appender(appender = appender_file(file = logfile))
# Set threshold level
log_threshold(DEBUG)
```

Then, we can log messages with [logging functions](https://daroczig.github.io/logger/reference/log_level.html). Here, we use `log_debug` and `log_info` function to write to our logfile. Note that by default, {logger} uses the {glue} syntax to concatenate text and expressions (exemplified in `"res is {res}"`).

``` r
# Write things to the logger
log_debug("Start script")
res <- 40 + 2
log_info("res is {res}")
log_debug("End analyses")
```

Here is our logfile:

    DEBUG [2026-03-13 16:00:59] Start script
    INFO [2026-03-13 16:00:59] res is 42
    DEBUG [2026-03-13 16:00:59] End analyses

That's it for a basic logger!

### Setting logger level

Now imagine we want a detailed logger in the testing phase, but when launching our final script we want to print only important stuff. This can be achieved by changing the log level.

``` r
# Create a log file and a file connection
logfile <- tempfile(fileext = ".log")
log_appender(appender = appender_file(file = logfile))
# Change log level to INFO
log_threshold(INFO)

# Write things to the logger
log_debug("Start script")
res <- 40 + 2
log_info("res is {res}")
log_debug("End analyses")
```

In the code above with a log level set to `INFO`, all `DEBUG` messages are omitted.

    INFO [2026-03-13 16:00:59] res is 42

### Logging warnings, errors and messages

Now a useful thing to log are errors, warnings and messages occurring during computations. Consider the code below:

``` r
# Create a log file and a file connection
logfile <- tempfile(fileext = ".log")
log_appender(appender = appender_file(file = logfile))
log_threshold(DEBUG)

# Write things to the logger
log_debug("Start script")
res <- "forty-two"
log_info("res is {res}")
res <- as.numeric(res) # This produces a warning
```

    Warning: NAs introduced by coercion

``` r
log_debug("End analyses")
```

Now, the certainly the logfile should show the warning?

    DEBUG [2026-03-13 16:00:59] Start script
    INFO [2026-03-13 16:00:59] res is forty-two
    DEBUG [2026-03-13 16:00:59] End analyses

... except it doesn't. The logger records only what we tell it to, so we need to explicitly ask to record warnings.

To record warnings, we need to use `log_warnings()`[^2]:

``` r
library(here)

# Create a log file and a file connection
logfile <- here("content", "posts", "logging", "logfile.log")
log_appender(appender = appender_file(file = logfile))
log_threshold(DEBUG)

# Record errors in logger
log_warnings()

# Write things to the logger
log_debug("Start script")
res <- "forty-two"
log_info("res is {res}")
res <- as.numeric(res)
log_debug("End analyses")
```

    DEBUG [2026-03-10 11:54:57] Start script
    INFO [2026-03-10 11:54:57] res is forty-two
    WARN [2026-03-10 11:54:57] NAs introduced by coercion
    DEBUG [2026-03-10 11:54:57] End analyses
    DEBUG [2026-03-13 16:00:04] Start script
    INFO [2026-03-13 16:00:04] res is forty-two
    WARN [2026-03-13 16:00:04] NAs introduced by coercion
    DEBUG [2026-03-13 16:00:04] End analyses
    WARN [2026-03-13 16:00:37] Ignoring this call to log_warnings as it was registered previously.
    DEBUG [2026-03-13 16:00:37] Start script
    INFO [2026-03-13 16:00:37] res is forty-two
    WARN [2026-03-13 16:00:37] NAs introduced by coercion
    DEBUG [2026-03-13 16:00:37] End analyses

The same is true for errors and messages, which can be recorded with `log_messages()` and `log_errors()`.

### Logging with parallel computing

Another thing I find interesting with {logger} is that it's handy to keep track of what's happening in different parallel processes (see [this great blogpost](https://frbcesab.github.io/tips-and-tricks/posts/2025-01-28-parallel-computing-in-r/) for more explanations on parallel computing in R). Consider the parallel code below, which gives the number of species sightings:

``` r
# Parallel computing libraries
library(parallel)
library(foreach)
library(doParallel)

# Parallel computing setup
n_cores <- 4
cluster <- makeCluster(spec = n_cores)
registerDoParallel(cluster)

# Generate dummy dataset of species sightings
species_counts <- lapply(1:4, 
                         function(i) rbinom(10, size = 1, prob = 0.5))
names(species_counts) <- c("dragonfly", "crow", "whale", "daisy")

# Parallel loop
res <- foreach(i = 1:4) %dopar% {
    # Get number or species seen
    res <- c(names(species_counts)[i], sum(species_counts[[i]]))
    return(res)
}
stopCluster(cluster)

res
```

    [[1]]
    [1] "dragonfly" "8"        

    [[2]]
    [1] "crow" "5"   

    [[3]]
    [1] "whale" "6"    

    [[4]]
    [1] "daisy" "6"    

We can log parallel events by defining a logger in each parallel process:

``` r
# Parallel computing setup
cluster <- makeCluster(spec = n_cores)
clusterEvalQ(cl = cluster, 
             expr = {library(logger)})
clusterExport(cl = cluster, 
              varlist = c("log_appender", "appender_file", "log_info"))
registerDoParallel(cluster)

# Get temporary directory for logfiles
tmpdir <- tempdir()

# Parallel loop
res <- foreach(i = 1:4) %dopar% {
    sp <- names(species_counts)[i]
    # Create species logger
    logfile <- tempfile(pattern = paste0(sp, "_"), 
                        tmpdir = tmpdir, 
                        fileext = ".log")
    log_appender(appender = appender_file(file = logfile))
    # Compute and log sightings
    log_info("Logger for species {sp}")
    res <- sum(species_counts[[i]])
    log_info("Species count: {res}")
    # Result
    return(paste(sp, res))
}
stopCluster(cluster)
```

Let's see what's in the logfiles:

    [1] "Logger crow_19464ff4be3.log -----"
    INFO [2026-03-13 16:01:00] Logger for species crow
    INFO [2026-03-13 16:01:00] Species count: 5
    [1] "Logger daisy_2888b36753e.log -----"
    INFO [2026-03-13 16:01:00] Logger for species daisy
    INFO [2026-03-13 16:01:00] Species count: 6
    [1] "Logger dragonfly_1164c8f1533.log -----"
    INFO [2026-03-13 16:01:00] Logger for species dragonfly
    INFO [2026-03-13 16:01:00] Species count: 8
    [1] "Logger whale_2aac5b9c1c0c.log -----"
    INFO [2026-03-13 16:01:00] Logger for species whale
    INFO [2026-03-13 16:01:00] Species count: 6

Amazing! Our outputs got copied to the files!

## Conclusion

Logging is a great way to improve the reproducibility of analyses, and the {logger} packages can really make logging easy. This post showcased some applications of the package, including logging warnings and using it with parallel computing, but many other applications are possible!

## Resources

-   {logger} package [documentation](https://daroczig.github.io/logger/index.html)
-   {logger} [presentation](https://www.youtube.com/watch?v=_rUuBbml9dU) at RStudio::conf 2020

[^1]: contrary to forestry, where it is the practice of cutting down trees.

[^2]: note that the chunk below is not run interactively, because Quarto doesn't work with `log_warnings()`.
