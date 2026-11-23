
# Node.js MongoDB Task Manager

A REST API developed using Node.js, Express,
MongoDB, and Mongoose.

This project demonstrates environment-specific
configuration, CRUD functionality, and Git Flow.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Git

## Project Structure

src/
  config/
    env.js
    database.js
  models/
    Task.js
  controllers/
    taskController.js
  routes/
    taskRoutes.js
  app.js
  server.js

tests/
  taskApi.test.js

## Features

- Create, read, update, and delete tasks
- Dynamic environment configuration
- Separate MongoDB databases per environment
- Schema validation and HTTP error handling
- Automated API and model tests
- Git Flow branching strategy

## Environments

| Environment | Port | Database |
|-------------|------|----------|
| Staging | 3001 | tasks_staging |
| Preprod | 3002 | tasks_preprod |
| Production | 3003 | tasks_prod |

The APP_ENV variable determines which
configuration file is loaded.

For example, APP_ENV=staging loads .env.staging.

## Installation

Install dependencies:

    npm install

Create local configuration files:

    cp .env.staging.example .env.staging
    cp .env.preprod.example .env.preprod
    cp .env.prod.example .env.prod

A running MongoDB server is required to start the
API. The provided examples use local databases.

## Running the Application

Staging:

    npm run start:staging

Preproduction:

    npm run start:preprod

Production:

    npm run start:prod

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get a task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

Example POST request body:

    {
      "title": "Complete assignment",
      "description": "Finish Node.js project",
      "completed": false
    }

## Testing

Run automated tests:

    npm test

The tests cover basic API responses,
task validation, and invalid identifiers.

These tests do not require MongoDB.
Database-backed CRUD behavior has not been
covered by integration tests.

## Git Flow

This project follows a Git Flow branching strategy.

- main: stable released code
- develop: integration branch
- feature/*: individual features
- fix/*: fixes during development
- release/*: release preparation

Features are developed on separate branches,
committed with descriptive messages, and merged
into develop using --no-ff.

Releases are prepared on release branches before
being merged into main and develop.
