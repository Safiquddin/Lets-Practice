#!/bin/bash
# This script converts a PDF into a
# series of PNG images.
PDF=$1
# Replace ".pdf" with "-slides.png"
SLIDES=${PDF/.pdf/-slides.png}
# Replace spaces with hyphens
SLIDES=${SLIDES// /-}
# Convert to lowercase
SLIDES=${SLIDES,,}
# Extract the basename from the path.
SLIDES=$(basename $SLIDES)
# Convert the PDF into a series of images.
convert -density 300 "$PDF" -quality 100
$SLIDES
