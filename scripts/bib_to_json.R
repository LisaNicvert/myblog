library(bib2df)
library(jsonlite)
library(here)

# get data folder
scripts_folder <- here("scripts")
data_folder <- here("data")

# Read the .bib file
bib <- bib2df(file.path(scripts_folder, "publications.bib"))

# Clean and select fields you want
publications <- bib[, c("TITLE", "AUTHOR", "YEAR", "JOURNAL",
"VOLUME", "NUMBER", "PAGES", "DOI")]

publications$AUTHOR <- sapply(publications$AUTHOR, function(a) paste(a, collapse = ", "))
publications$TITLE <- gsub("[{}]", "", publications$TITLE)

colnames(publications) <- tolower(colnames(publications))

# Write to Hugo data folder
write_json(publications, file.path(data_folder, "publications.json"), 
           pretty = TRUE, na = "null")
