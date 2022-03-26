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

## Spring

- https://nutbutterfly.medium.com/spring-boot-postgresql-uuid-string-f6ca7d8139ed
- https://stackoverflow.com/questions/30574593/hibernate-jpa-2-postgresql-entity-uuid-as-a-primary-key
- https://spring.io/guides/tutorials/rest/

## Typescript

- https://www.typescriptlang.org/docs/handbook/classes.html

## Rails
- https://guides.rubyonrails.org/active_record_migrations.html
- https://stackoverflow.com/questions/7542976/add-timestamps-to-an-existing-table
