#!/usr/bin/env bash

export DOCKER_ENV=build
. $(realpath $(dirname $0))/base_env.sh

BUILD_TAG=$1

if [[ $BUILD_TAG == "" ]]; then
    echo "USAGE: $0 [BUILD_TAG]"
    exit
fi

docker image tag rock_build_api ${DOCKER_REGISTRY_URL}/rock_build_api:latest
docker image tag rock_build_api ${DOCKER_REGISTRY_URL}/rock_build_api:${BUILD_TAG}

docker image ls | grep rock
