# Stateful Validation of Database Migrations

This application is a demonstration of how to validate database migrations will succeed before being run in production environments. The application uses real, anonymized production data to verify migrations work and don't fail against outlier data.

This application is based off of the reference app at [pvcy/anonymize-demo](https://github.com/pvcy/anonymize-demo).

## Overview
This sample app runs a GitHub workflow to verify success when pull requests contain database migration code.
The app uses two GitHub workflows, `build-and-push.yml` and `test-migration.yml`, to coordinate everything. The first workflow, `build-and-push.yml`, builds and stores a container image from the `/db` directory which will load data from a GCS bucket at startup. The second worklow, `test-migration.yml`, detects when migration changes in pull requests exist and runs the database container with a full copy of production data against which migrations can be tested. The success or failur of the migration is added as a comment to the pull request. 

## Assumptions
* This app assumes there is a `pg_dump` from PostgreSQL stored in a Google Cloud Storage (GCS) bucket.
* This is a Node app and uses [Sequelize](https://sequelize.org/) to run the database migration.
* The workflow variable `DB_BACKUP_URL` needs to be pointed at the bucket containing the backup.
* You must have [Docker](https://www.docker.com/) installed to run the app locally.
* This app loads the database backup into a PostgreSQL container when the workflow `test-migration` runs. If the data is exceptionally large, it may not load in time.


## Getting started
1. Create a backup of your production database with `pg_dump` and store it in a GCS bucket.
2. Run the PostgreSQL database locally with the command `docker compose up --build`. This will launch the three containers defined in `/docker-compose.yml` and load the sample data (`/users-api/data/users.json`) into the database container.
3. From the command line, run the migration with `$\users-api\src npx sequelize-cli db:migrate`. The migration should pass locally.
4. Create a migration 