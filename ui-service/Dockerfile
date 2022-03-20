FROM node:17.7.2-bullseye
WORKDIR /app

ARG DOCKER_USER=docker \
    DOCKER_PW=password \
    DOCKER_UID \
    DOCKER_GID

RUN test -n "$DOCKER_UID" && \
    test -n "$DOCKER_GID"

ENV NODE_PATH=/node_modules \
    PATH=$PATH:/app/bin:/node_modules/.bin \
    EDITOR=vim

####################
# NOTE KI CREATE dis for mounted volume permissions
RUN mkdir -p /node_modules && \
    mkdir -p /app/log && \
    mkdir -p /app/tmp && \
    ln -sf /node_modules node_modules

####################
RUN apt-get update && \
    apt-get install -y --no-install-recommends sudo grep less vim

RUN npm config set scripts-prepend-node-path true
RUN ln -sf /node_modules node_modules

####################

####################
RUN echo "useradd -m ${DOCKER_USER} --uid=${DOCKER_UID} --gid=${DOCKER_GID}"
#RUN useradd -m ${DOCKER_USER} --uid=${DOCKER_UID} --gid=${DOCKER_GID} && \
#    echo "${DOCKER_USER}:${DOCKER_PW}" | chpasswd

RUN echo "docker ALL=(ALL:ALL) NOPASSWD: ALL" | tee /etc/sudoers.d/docker

# NOTE KI Permissions WILL be applied to mounted volumes
RUN chown -R ${DOCKER_UID}:${DOCKER_GID} /node_modules /app

USER ${DOCKER_UID}:${DOCKER_GID}

####################
EXPOSE 3000

ENTRYPOINT ["docker/docker-entrypoint.sh"]
