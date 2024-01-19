#!/bin/bash

if [[ "${LOAD_DATA:=True}" == "True" ]]; then
  echo "Loading Data..."
  node load-data.js
else
  echo "Skipping data loading"
fi

node server.js
