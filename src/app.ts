import Person from "./Person";
import Collection from "@cycle/collection";
import { VNode, a, div, img, li, makeDOMDriver, nav, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { run } from "@cycle/xstream-run";
import { prop } from "ramda";
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
  const leanne = {
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
  };

  const phyllis = {
    "id": "5763cd4dba6362a3f92c954e",
    "photo": "https://randomuser.me/portraits/women/74.jpg",
    "firstname": "Phyllis",
    "lastname": "Donovan",
    "entity": "PEARLESSA",
    "email": "Phyllis.Donovan@PEARLESSA.com",
    "skills": [
      "fugiat",
      "deserunt",
      "culpa",
      "adipisicing",
      "Lorem",
    ],
    "phone": "0685230125",
    "links": {
      "twitter": "https://twitter.com/non",
      "slack": "https://slack.com/enim",
      "github": "https://github.com/laborum",
      "linkedin": "https://www.linkedin.com/in/et",
    },
    "isManager": false,
    "manager": "Erika",
    "managerId": "5763cd4d3b57c672861bfa1f",
  };

  // className for detailedView = ".col.s6.offset-s3"

  const persons$ = Collection(
    Person,
    { props: Stream.of({ className: ".col.s6", isDetailed: false }) },
    Stream.of([
      { profile: Stream.of(leanne) },
      { profile: Stream.of(phyllis) },
      { profile: Stream.of(leanne) },
    ])
  );

  const personsVTree$ = Collection.pluck(persons$, prop("DOM"));

  const containerDom$ = personsVTree$.map((personsVTree) =>
    div(".container", [
      div(".row", personsVTree),
    ])
  );

  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      navDom$,
      containerDom$
    ).map(div),
  };
}

// Declare drivers that will perform the side-effects.
const drivers: { [name: string]: Function } = {
  DOM: makeDOMDriver("#app"),
};

// Kick-off the application!
run(main, drivers);
