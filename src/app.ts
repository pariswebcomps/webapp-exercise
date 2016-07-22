import Person from "./Person";
import { VNode, a, div, img, li, makeDOMDriver, nav, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { run } from "@cycle/xstream-run";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
}

interface ISinks {
  DOM: Stream<VNode>;
}

// A stream containing the hyperscript representation of the navigation.
const navDom$ = Stream.of(
  nav(".bg-color-primary", [
    div(".nav-wrapper", [
      a({ "attrs": { "href": "list.html" } }, [
        img(
          ".logo",
          {
            "attrs": {
              "src": "src/images/logo-people.svg",
              "className": "logo",
            },
          }
        ),
      ]),
      ul(".right.hide-on-med-and-down", [
        li([
          a({ "attrs": { "href": "list.html" } }, [`Peoples`]),
        ]),
      ]),
    ]),
  ])
);

// Our main application logic.
// Takes observables input sources from drivers.
// Does some pure dataflow operations = the app logic.
// Returns observables output sinks to the drivers.
function main(sources: ISources): ISinks {
  const profile$ = Stream.of({
    "id": "5763cd4d9d2a4f259b53c901",
    "photo": "https://randomuser.me/portraits/women/59.jpg",
    "firstname": "Leanne",
    "lastname": "Woodard",
    "entity": "BIOSPAN",
    "email": "Leanne.Woodard@BIOSPAN.com",
    "skills": [
      "pariatur",
      "ipsum",
      "laboris",
      "nostrud",
      "elit",
    ],
    "phone": "0784112248",
    "links": {
      "twitter": "https://twitter.com/laboris",
      "slack": "https://slack.com/fugiat",
      "github": "https://github.com/velit",
      "linkedin": "https://www.linkedin.com/in/voluptate",
    },
    "isManager": false,
    "manager": "Erika",
    "managerId": "5763cd4d3b57c672861bfa1f",
  });

  const person = Person({ profile: profile$ });

  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      navDom$,
      person.DOM
    ).map(div),
  };
}

// Declare drivers that will perform the side-effects.
const drivers = {
  DOM: makeDOMDriver("#app"),
};

// Kick-off the application!
run(main, drivers);
