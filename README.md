# Meetup Paris WebComponents - WebApp Exercise

Specs and scaffold of a webapp to develop to compare frameworks implementation.

## Expected result

The `static/` directory contains HTML files of the different screen that you should implement.

These files are static. You need to implement features (filtering the list, validating the form…) in your webapp.

## About your talk at Paris WebComponents

It should last 20 minutes + 5 minutes of questions.

What will be expected during your talk at Paris WebComponents:

- present the ecosystem of your framework (eg., do you have DevTools? which task runner do you use?…)
- present the `detail.html` and `list.html` parts explaining how you achieved re-usability of your components
- present how routing (= navigation) works
- present how you handle form validation with the `edit.html` part
- explain the philosophy and specificities of your framework all along

You'll be awesome!

## Set up

After cloning the repo, run:

    npm install -g aurelia-cli
    au run

This will install required packages for the server to run (npm) and the front done by Aurelia.

## Start the server

So far, `npm start` serves the REST data at `http://localhost:3001`:

This provides you following routes:

Method | Route              | Result
------ | ------------------ | ------
GET    | `/api/peoples`     | List all peoples
GET    | `/api/peoples/:id` | Get details about `:id`
PUT    | `/api/peoples/:id` | Update `:id`
