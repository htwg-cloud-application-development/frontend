#!/usr/bin/env bash
export PATH=$PATH:$PWD/node_modules/.bin
npm install --unsafe-perm
exec ws -d apiv1 --verbose --rewrite '/* -> $1.json'