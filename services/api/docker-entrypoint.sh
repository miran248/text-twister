#!/bin/sh
set -e

node ./build/main.js

exec "$@"
