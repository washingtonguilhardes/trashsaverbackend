# Trash Saver Backend

Backend project for Trash Saver Solution.

# Environment Variables

| NAME | DESCRIPTION    | EXAMPLE    |
| :---   | :--- | :---: |
| PORT | Port where backend will response for request| 8080
| ACCEPT_EULA | It will be used for docker-compose with mssql runing localy | Y
| MSSQL_PORT | It will be used for docker-compose with mssql runing localy | 51433
| SA_USERNAME |It will be used for docker-compose with mssql runing localy | sa
| SA_PASSWORD |It will be used for docker-compose with mssql runing localy | Pass@word123
| MSSQL_SA_PASSWORD | It will be used for docker-compose with mssql runing localy | Pass@word123
| INSTANCE_HOST | Database instance where SQL Server was hosted | localhost
| DB_PORT | Database port | 51433
| DB_USER | Database user | sa
| DB_PASS | Database user password | Pass@word123
| DB_NAME | Database name | trashsaverdb

## Nest.js

This project uses the Nest.js Framework, TypoORM, and Yup Validator

You can read more about Nest.js [here](https://docs.nestjs.com/)

### Structure

Following Next.js pattern, the pages could be found in `pages/` folder.

- All application components can be found in `src/` folder with her modules, e.g `src/user/*`.
- The custom guards and catches should be placed in the `src/` root folder, e.g `app.exception.ts`, `app.catch.ts`,`app-request-logger.middleware.ts`
- The database settings should be placed in `src/database/datasource.provider.ts`
- The database migrations should be placed in `src/database/migrations/*`
  - If you need, you can use `yarn typeorm migration:generate -n [migration name]` to auto-generate migrations.
  - You can read more about typeorm migrations [here](https://orkhan.gitbook.io/typeorm/docs/migrations)

### Entities

The database entities follow the typeorm recomendations and their name ends with `*.entity.ts`.
This project uses UUID for auto-generate entity primary id.

You can read more about entities and relationships [here](https://typeorm.io/entities)


## How to execute it?

First you need clone this project and run `yarn install` to install all project dependecies.
Next you can execute `yarn start:dev` and then access  `http://localhost:8080/api/v1` with appropriate env variables

> Make sure that you had created a `.env` file with your environmental variables

## Database localy

If you don't have a SQL Server instance, you can use the docker to create and start an instance localy. You should run `docker compose -f ./docker-compose.dev.yml up --build -d --remove-orphans` to start the database service as daemon process.

After that, you should run the migrations `yarn typeorm migration:run`.

> Make sure that you had updated env variables in cli.ormconfig.json.
> If you wanna run migrations in production, you should run the follow command: `yarn prdtypeorm -f ./cli.ormconfig.prod.json migration:run`. Make sure that you had updated the file `cli.ormconfig.prod.json` with production variables.
