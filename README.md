# Node < GraphQL > React starter project

Starter project to start easily a project using Node, GraphQL and React.

It includes **backend** and **frontend** code.

## Backend

- **Node**: platform.
- **Docker**: to run database services.
- **graphql-yoga**: GraphQL server.
- **Sequelize**: best ORM for relational databases (PostgreSQL, MySQL, MariaDB,
  etc.). Requires extra configuration and dependencies.
- **Mongoose**: ODM for MongoDB, with schemas support.
- **Redis**: key-value database.
- **Jest**: unit and integration testing.

Code is well structured and organized to be modular. You can add models and
modules (*GraphQL schemas and resolvers*) easily.

## Frontend

- **Next.js**: Server side rendering framework.
- **React**: UI library. With hooks support!
- **@apollo/react-hooks**: GraphQL library for React using hooks (useQuery,
  useMutation, useSuscription).
- **FontAwesome**: for icons.
- **Basic dashboard structure**: made with CSS Grid, FontAwesome, react-router and @apollo/react-hooks.

![Dashboard](docs/dashboard.png)

## Test

There are some helpers in `backend/tests/` to run tests. Some integration tests
have been written to show how easy is to set up the environment for testing.

Each test starts a new instance of GraphQLServer and make a new connection to
each DB (Sequelize and Redis use *mock* libraries, mongo makes real connections,
an running instance is needed). And each test uses an empty database with a
*prefix*.

For example, if I want to test User related things like models and resolvers, a
new connection to mongo will be made and all the data will be stored in
`database-test-user`. Testing Post all the data will be stored in
`database-test-post`.

# How to use

The **frontend** is ready to be used.

The **backend** uses [MongoDB](https://www.mongodb.com/) as main database and
redis as a key-value store.

Models are loaded into `models` object of `db/index.js` and they are passed in
context to be available inside each resolver of the application.

If you want to use Sequelize ORM with Postgres you must delete `src/db` folder
and rename `src/db-sequelize` to `src/db`. By this way you replace *mongoose*
models by *Sequelize* models.

Sequelize works great with a custom DataLoader. 

## Set up the databases

The entire environment can run on Docker. It's recommended.

Each service can be set up from *docker-compose* configuration files. There are
two files to start containers of: **mongo**, **postgres** and **redis**. The
necessary visual managers (GUI) will be started for each service:
*mongo-express* to manage mongo, *pgadmin* to manage PostgreSQL and
*redis-commander* to manage Redis. The three managers are web based.

```
# Starting mongo, mongo-express, redis and redis-commander
docker-compose up -d
```

```
# Starting postgres too
docker-compose -f docker-compose.yml -f docker-compose.postgres.yml up -d
```
