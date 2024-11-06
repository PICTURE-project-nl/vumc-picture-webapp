#!/usr/bin/env bash

yarn
concurrently \
  "yarn extract-routes" \
  "yarn start-watchers" \
  "nuxt --hostname tool.pictureproject.nl"
