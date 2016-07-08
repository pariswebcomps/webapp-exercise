# Meetup Paris WebComponents - WebApp Exercise

Specs and scaffold of a webapp to develop to compare frameworks implementation.

## Expected result

The static directory contains the expected visuals of the webapp.

    // TODO - Explain the exercise.

## Start the server

This command serves the REST data at `http://localhost:3001`:

    npm start

You will need to npm install and bower install before launching.

This provides you following routes:

Method | Route              | Result
------ | ------------------ | ------
GET    | `/api/peoples`     | List all peoples
GET    | `/api/peoples/:id` | Get details about `:id`
PUT    | `/api/peoples/:id` | Update `:id`
