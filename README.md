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

## Spring Boot
- https://spring.io/projects/spring-boot
- https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#documentation
- https://nutbutterfly.medium.com/spring-boot-postgresql-uuid-string-f6ca7d8139ed
- https://stackoverflow.com/questions/30574593/hibernate-jpa-2-postgresql-entity-uuid-as-a-primary-key
- https://spring.io/guides/tutorials/rest/
- https://zetcode.com/springboot/postgresql/
- https://github.com/spring-projects/spring-data-examples/tree/main/jpa/example/src/main/java/example/springdata/jpa
- https://www.baeldung.com/spring-415-unsupported-mediatype
- https://thorben-janssen.com/ultimate-guide-association-mappings-jpa-hibernate
- https://stackoverflow.com/questions/3325387/infinite-recursion-with-jackson-json-and-hibernate-jpa-issue
- https://www.javafixing.com/2022/01/fixed-415-http-media-type-not-supported.html

## Typescript
- https://www.typescriptlang.org/docs/handbook/classes.html
- https://www.educba.com/typescript-type-vs-interface/

## React
- https://create-react-app.dev/docs/getting-started/
- https://reactrouter.com
- https://www.geeksforgeeks.org/reactjs-router/
- https://stackoverflow.com/questions/38196448/can-i-set-a-base-route-in-react-router
- https://reactjs.org/docs/hooks-intro.html
- https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
- https://stackoverflow.com/questions/33438186/react-router-cannot-read-property-transitionto-of-undefined
- https://dev.to/kozakrisz/react-router---how-to-pass-history-object-to-a-component-3l0j
- https://github.com/remix-run/react-router/issues/8146
- https://reactjs.org/docs/context.html#reactcreatecontext
- https://www.freecodecamp.org/news/react-context-for-beginners/
- https://medium.com/@rrohit.maheshwari/react-app-using-redux-e6a1a69822d1
- https://stackoverflow.com/questions/41892553/could-not-find-store-in-either-the-context-or-props-of-connectapp
- https://www.johnraptis.dev/using-redux-with-classes-and-hooks/

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
