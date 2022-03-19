FROM eclipse-temurin:11
WORKDIR /app

ARG DOCKER_USER=docker \
    DOCKER_PW=password \
    DOCKER_UID \
    DOCKER_GID

RUN test -n "$DOCKER_UID" && \
    test -n "$DOCKER_GID"

RUN mkdir -p /app && \
    mkdir -p app/log && \
    mkdir -p app/tmp

ENV EDITOR=vim

####################
RUN apt-get update && \
    apt-get install -y --no-install-recommends socat sudo grep less vim

####################
RUN echo "useradd -m ${DOCKER_USER} --uid=${DOCKER_UID} --gid=${DOCKER_GID}"
RUN useradd -m ${DOCKER_USER} --uid=${DOCKER_UID} --gid=${DOCKER_GID} && \
    echo "${DOCKER_USER}:${DOCKER_PW}" | chpasswd

RUN echo "docker ALL=(ALL:ALL) NOPASSWD: ALL" | tee /etc/sudoers.d/docker

# NOTE KI Permissions WILL be applied to mounted volumes
RUN chown -R ${DOCKER_UID}:${DOCKER_GID} /app

USER ${DOCKER_UID}:${DOCKER_GID}

####################
EXPOSE 8080

ENTRYPOINT ["docker/docker-entrypoint.sh"]
