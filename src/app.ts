import PersonDetail from "./PersonDetail";
import PersonEdit from "./PersonEdit";
import PersonList from "./PersonList";

import { VNode, a, div, img, li, makeDOMDriver, nav, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { makeHTTPDriver } from "@cycle/http";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { run } from "@cycle/xstream-run";
import { makeRouterDriver } from "cyclic-router";
import { createHistory } from "history";
import { lensProp, prop, set } from "ramda";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
  router: any;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
}

// A stream containing the hyperscript representation of the navigation.
const navVTree$ = Stream.of(
  nav(".bg-color-primary", [
    div(".nav-wrapper", [
      a({ "attrs": { "href": "/" } }, [
        img(
          ".logo",
          {
            "attrs": {
              "src": "/src/images/logo-people.svg",
              "className": "logo",
            },
          }
        ),
      ]),
      ul(".right.hide-on-med-and-down", [
        li([
          a({ "attrs": { "href": "/" } }, [`Peoples`]),
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
  // Define routes here.
  const match$ = sources.router.define({
    "/": PersonList,
    "/detail/:id": id => parsedSources => PersonDetail({
      HTTP: parsedSources.HTTP,
      props: Stream.of({ id }),
    }),
    "/edit/:id": id => parsedSources => PersonEdit({
      HTTP: parsedSources.HTTP,
      props: Stream.of({ id }),
    }),
  });

  // For each route, init bound component (= value) with sources.
  const page$ = match$.map(({path, value}) => {
    return value(
      // Router source is resolved from the path to enable history.
      set(lensProp("router"), sources.router.path(path), sources)
    );
  });

  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      navVTree$,
      page$.map(prop("DOM")).flatten()
    ).map(div),
    HTTP: page$.map(prop("HTTP")).flatten(),
  };
}

// Declare drivers that will perform the side-effects.
const drivers: { [name: string]: Function } = {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver(),
  router: makeRouterDriver(createHistory(), { capture: true }),
};

// Kick-off the application!
run(main, drivers);
