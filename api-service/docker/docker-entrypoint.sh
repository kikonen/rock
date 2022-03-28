#!/bin/bash

#socat TCP-LISTEN:11211,fork TCP:memcached:11211 &
#socat TCP-LISTEN:6379,fork TCP:redis:6379 &

if [[ $1 != '' ]]; then
    exec "$@"
    exit $?
fi

if [[ "$SERVICE_MODE" == "debug" ]]; then
    java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=0.0.0.0:8000,suspend=n \
         -jar build/libs/rock-$VERSION.jar
else
    java -jar build/libs/rock-$VERSION.jar
fi
