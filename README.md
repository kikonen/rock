Simple Rock-Paper-Scissors decision assist utility

# Development

## Setup
cp _env .env
cp _development_env .development_env
##

## Database setup

```bash
cd rock
scripts/container_shell.sh schema
rake db:drop db:create db:migrate db:setup
```

## Build

```bash
cd rock
cd api-service
./gradlew clean build -x test
```

## Run

```bash
cd rock
scripts/development_up.sh ui

http://localhost:8111/ui
```

# Referneces

## Concept
- https://en.wikipedia.org/wiki/Rock_paper_scissors

## SpringBoot
- https://spring.io/projects/spring-boot
- https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#documentation
- https://nutbutterfly.medium.com/spring-boot-postgresql-uuid-string-f6ca7d8139ed
- https://stackoverflow.com/questions/30574593/hibernate-jpa-2-postgresql-entity-uuid-as-a-primary-key
- https://spring.io/guides/tutorials/rest/
- https://zetcode.com/springboot/postgresql/
- https://github.com/spring-projects/spring-data-examples/tree/main/jpa/example/src/main/java/example/springdata/jpa

## Typescript

- https://www.typescriptlang.org/docs/handbook/classes.html

## React
- https://create-react-app.dev/docs/getting-started/
- https://www.geeksforgeeks.org/reactjs-router/
- https://stackoverflow.com/questions/38196448/can-i-set-a-base-route-in-react-router

## Rails
- https://guides.rubyonrails.org/active_record_migrations.html
- https://stackoverflow.com/questions/7542976/add-timestamps-to-an-existing-table

## Emacs
- https://dev.to/viglioni/how-i-set-up-my-emacs-for-typescript-3eeh

## Websocket
- https://spring.io/guides/gs/messaging-stomp-websocket/
- https://umes4ever.medium.com/real-time-application-using-websocket-spring-boot-java-react-js-flutter-eb87fe95f94f
- https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html
- https://github.com/stomp-js/stompjs
- https://lzomedia.com/blog/react-native-websocket-connectios-with-stomp-stompjs/
- https://community.developers.refinitiv.com/questions/78983/websocket-server-stops-sending-data-to-client-afte.html
