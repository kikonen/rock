#!/bin/bash

if [[ $1 != '' ]]; then
    exec "$@"
    exit $?
fi

if [[ "$SERVICE_MODE" == "debug" ]]; then
    echo "SERVICE_MODE: $SERVICE_MODE"
    sleep infinity
else
    yarn install
    yarn run start
fi
