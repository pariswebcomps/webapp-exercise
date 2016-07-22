import Person from "./Person";
import Collection from "@cycle/collection";
import { VNode, a, div, img, li, makeDOMDriver, nav, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { makeHTTPDriver } from "@cycle/http";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { run } from "@cycle/xstream-run";
import { map, pipe, prop } from "ramda";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
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
function main({HTTP}: ISources): ISinks {
  const personsResponse$ = HTTP.select("persons").flatten();

  const parseResponseToPersons = pipe(
    prop("body"),
    map((profile) => ({ profile: Stream.of(profile) }))
  );

  const persons$ = Collection(
    Person,
    // className for detailedView = ".col.s6.offset-s3"
    { props: Stream.of({ className: ".col.s6", isDetailed: false }) },
    personsResponse$.map(parseResponseToPersons)
  );

  const personsVTree$ = Collection.pluck(persons$, prop("DOM"));

  const containerDom$ = personsVTree$.map((personsVTree) =>
    div(".container", [
      div(".row", personsVTree),
    ])
  );

  // Fetch the API for all persons.
  // For now we are firing a single request on app launch.
  const personsRequest$ = Stream.of({
    category: "persons",
    url: "http://localhost:3001/api/peoples",
  });

  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      navDom$,
      containerDom$
    ).map(div),
    // Trigger HTTP requests.
    HTTP: personsRequest$,
  };
}

// Declare drivers that will perform the side-effects.
const drivers: { [name: string]: Function } = {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver(),
};

// Kick-off the application!
run(main, drivers);
