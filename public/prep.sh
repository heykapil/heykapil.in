#!/bin/bash
set -x
for file in $1; do
filename=${file%.*}
pdfcrop --margins 10 --clip "$filename.pdf" "$filename.pdf"
pdf2svg "$filename.pdf" "$filename.svg"
done