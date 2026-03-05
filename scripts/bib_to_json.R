library(bib2df)
library(jsonlite)
library(purrr)
library(here)

# get data folder
scripts_folder <- here("scripts")
data_folder <- here("data")

# Read the .bib file
bib <- bib2df(file.path(scripts_folder, "publications.bib"))

# Clean and select fields you want
publications <- bib[, c("CATEGORY", "TITLE", "AUTHOR", "YEAR", "JOURNAL",
"VOLUME", "NUMBER", "PAGES", "PUBLISHER", "DOI")]

# Rename categories
old_categories <- c("ARTICLE", "PHDTHESIS", "MISC")
new_categories <- c("Published articles", "PhD thesis", "Preprints")
names(new_categories) <- old_categories

publications$CATEGORY <- unname(new_categories[publications$CATEGORY])
publications$AUTHOR <- sapply(publications$AUTHOR, function(a) paste(gsub(",", "", a), collapse = ", "))
publications$TITLE <- gsub("[{}]", "", publications$TITLE)

# Rename columns
colnames(publications) <- tolower(colnames(publications))

# Add notes
# notes <- c("My first ever published article!", NA, NA, NA)
# publications$note <- notes

# Add order attribute
category_order <- c(1, 2, 3)
names(category_order) <- c("Published articles", "Preprints", "PhD thesis")

publications <- publications |> 
  split(publications$category) |>
  purrr::imap(function(x, name) list(
    name = name,
    order = unname(category_order[name]),
    items = x[, names(x) != "category"]
  ))

# Write to Hugo data folder
write_json(publications, file.path(data_folder, "publications.json"), 
           pretty = TRUE, na = "null", auto_unbox = TRUE)
