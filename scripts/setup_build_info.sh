#!/usr/bin/env bash

export DOCKER_ENV=build
. $(realpath $(dirname $0))/base_env.sh

if [[ ! -d $PROJECTS_DIR ]]; then
    exit
fi

REPOS=$(ls $PROJECTS_DIR)

# NOTE KI https://stackoverflow.com/questions/35385962/arrays-in-a-posix-compliant-shell
echo "$REPOS" | tr ' ' '\n' | while read REPO; do
    REPO_DIR=$PROJECTS_DIR/$REPO
    if [[ -d $REPO_DIR ]]; then
        echo "BUILD_INFO: $REPO_DIR"
        (cd $REPO_DIR && $SCRIPT_DIR/create_build_info.sh > $REPO_DIR/docker/build_info.json)
        cat $REPO_DIR/docker/build_info.json
    fi
done
