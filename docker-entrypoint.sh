#!/usr/bin/env bash
npm install --unsafe-perm

if [ "$NODE_ENV" = "production" ]; then
  echo "Starting PRODUCTION mode"
  exec npm start
else
  echo "Starting DEV mode"
  npm run tsc
  exec ./node_modules/.bin/concurrently "npm run tsc:w" "npm run lite"
fi