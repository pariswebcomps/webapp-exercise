# Meetup Paris WebComponents - WebApp Exercise

This is the Cycle.js implementation of the [webapp exercise](https://github.com/pariswebcomps/webapp-exercise).

The selected stack for this implementation:

- [Cycle.js](https://github.com/cyclejs/cyclejs) running with [xstream](http://staltz.com/xstream/).
- [Ramda](http://ramdajs.com/) as a utils library
- [Tape](https://github.com/substack/tape) for unit testing
- [TSLint](http://palantir.github.io/tslint/) for code linting
- [Webpack](https://webpack.github.io/docs/) as a runner

The application is developed in [TypeScript](https://www.typescriptlang.org/) as Cycle.js strongly encourages it.

## Setup

Install dependencies with:

   npm i

## Start the server

This command serves the REST data at `http://localhost:3001`:

    npm start

This provides you following routes:

Method | Route              | Result
------ | ------------------ | ------
GET    | `/api/peoples`     | List all peoples
GET    | `/api/peoples/:id` | Get details about `:id`
PUT    | `/api/peoples/:id` | Update `:id`

## Run tests

To run unit tests with a nicely formatted report:

    npm run unit-test-diff --silent