import PersonDetail from "./PersonDetail";
import PersonEdit from "./PersonEdit";
import PersonList from "./PersonList";

import { makePreventDefaultDriver } from "./drivers/PreventDefault";

import { VNode, a, div, img, li, makeDOMDriver, nav, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { makeHTTPDriver } from "@cycle/http";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { run } from "@cycle/xstream-run";
import { makeRouterDriver } from "cyclic-router";
import { RouterSource } from "cyclic-router/lib/RouterSource";
import { createHistory } from "history";
import { complement, curry, isNil, lensProp, prop, set } from "ramda";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
  router: RouterSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
  preventDefault: Stream<any>;
  router: any;
}

const apiUrl = "http://localhost:3001/api/peoples";

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

const mergeSinks = curry((stream$: Stream<{}>, sinkName: string): any =>
  stream$.map(prop(sinkName))
    // Reject undefined values = streams that don't return given sinkName
    .filter(complement(isNil))
    .flatten()
);

// Our main application logic.
// Takes observables input sources from drivers.
// Does some pure dataflow operations = the app logic.
// Returns observables output sinks to the drivers.
function main(sources: ISources): ISinks {
  // Define routes here.
  const match$ = sources.router.define({
    "/": parsedSources => PersonList({
      HTTP: parsedSources.HTTP,
      props: Stream.of({ apiUrl }),
    }),
    "/detail/:id": id => parsedSources => PersonDetail({
      HTTP: parsedSources.HTTP,
      props: Stream.of({ id, apiUrl }),
    }),
    "/edit/:id": id => parsedSources => PersonEdit({
      DOM: parsedSources.DOM,
      HTTP: parsedSources.HTTP,
      props: Stream.of({ id, apiUrl }),
    }),
  });

  // For each route, init bound component (= value) with sources.
  const page$ = match$.map(({path, value}) => {
    return value(
      // Router source is resolved from the path to enable history.
      set(lensProp("router"), sources.router.path(path), sources)
    );
  });

  // Build a higher-order function that will merge sinks of given name, from all pages.
  const mergePageSinks = mergeSinks(page$);

  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      navVTree$,
      mergePageSinks("DOM")
    ).map(div),
    HTTP: mergePageSinks("HTTP"),
    preventDefault: mergePageSinks("preventDefault"),
    router: mergePageSinks("router"),
  };
}

// Declare drivers that will perform the side-effects.
const drivers: { [name: string]: Function } = {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver(),
  preventDefault: makePreventDefaultDriver(),
  router: makeRouterDriver(createHistory(), { capture: true }),
};

// Kick-off the application!
run(main, drivers);
