#!/bin/bash

if [[ $1 != '' ]]; then
    exec "$@"
    exit $?
fi

nginx -g "daemon off;"
