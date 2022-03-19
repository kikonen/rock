#!/usr/bin/env bash

export DOCKER_ENV=build
. $(realpath $(dirname $0))/base_env.sh

BUILD_TAG=$1

if [[ $BUILD_TAG == "" ]]; then
    echo "USAGE: $0 [BUILD_TAG]"
    exit
fi

docker image ls | grep rock

docker image push ${DOCKER_REGISTRY_URL}/rock_build_api:${BUILD_TAG}
