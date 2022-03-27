#!/bin/bash

if [[ $1 != '' ]]; then
    exec "$@"
    exit $?
fi

echo "SERVICE_MODE: $SERVICE_MODE"

if [[ "$SERVICE_MODE" == "debug" ]]; then
    sleep infinity
else
    #rake db:drop db:create db:migrate db:setup
    rake db:create
    rake db:migrate
fi
