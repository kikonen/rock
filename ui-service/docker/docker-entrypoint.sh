#!/bin/bash

if [[ $1 != '' ]]; then
    exec "$@"
    exit $?
fi

yarn install
yarn run start
