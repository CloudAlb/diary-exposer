#!/bin/sh

notes_path=$1

if [ -z "$notes_path" ]; then
  echo "Usage: `basename @0` [notes-path]"
  exit 1
fi

find "$notes_path" \
  -type f -name '*.md' -exec cat {} + | \
  sed 's/[^[:alnum:][:space:]]//g' | \
  tr '[:upper:]' '[:lower:]' | \
  tr '[:space:]' '[\n*]' | \
  sort | \
  uniq -c | \
  awk '{print "{\"" $2 "\": " $1 "}"}' | \
  jq -s 'add' > wordCount.json
