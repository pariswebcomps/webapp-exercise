# Meetup Paris WebComponents - WebApp Exercise in Elm

Specs and scaffold of a webapp to develop to compare frameworks implementation.

## Set up

After cloning the repo, run:

    npm install

Install [the "Elm Platform"](http://guide.elm-lang.org/get_started.html) too.

## Start the server

Run `npm start` to serve:

- the REST data at `http://localhost:3001`
- the web app at `http://localhost:3000`

This provides you following routes:

Method | Route              | Result
------ | ------------------ | ------
GET    | `/api/peoples`     | List all peoples
GET    | `/api/peoples/:id` | Get details about `:id`
PUT    | `/api/peoples/:id` | Update `:id`
