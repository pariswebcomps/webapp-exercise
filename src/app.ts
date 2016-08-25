import PersonDetail from "./PersonDetail";
import PersonEdit from "./PersonEdit";
import PersonList from "./PersonList";

import { SerializedForm, makeFormSubmitDriver } from "./drivers/FormSubmit";

import { mergeSinks } from "./utils";

import { VNode, a, div, img, li, makeDOMDriver, nav, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { makeHTTPDriver } from "@cycle/http";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { run } from "@cycle/xstream-run";
import { makeRouterDriver } from "cyclic-router";
import { RouterSource } from "cyclic-router/lib/RouterSource";
import { createHistory } from "history";
import { lensProp, set } from "ramda";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
  formSubmit: Stream<SerializedForm>;
  router: RouterSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
  formSubmit: Stream<Event>;
  router: any;
}

const apiUrl = "http://localhost:3001/api/peoples";

const navVTree = nav(".bg-color-primary", [
  div(".nav-wrapper", [
    a({ "attrs": { "href": "/" } }, [
      img(".logo", { "attrs": { "src": "/src/images/logo-people.svg" } }),
    ]),
    ul(".right.hide-on-med-and-down", [
      li([
        a({ "attrs": { "href": "/" } }, [`Peoples`])
      ]),
    ]),
  ]),
]);

// Our main application logic.
// Takes observables input sources from drivers.
// Does some pure dataflow operations = the app logic.
// Returns observables output sinks to the drivers.
function main(sources: ISources): ISinks {
  // Define routes.
  const match$ = sources.router.define({
    "/": parsedSources => PersonList({
      DOM: parsedSources.DOM,
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
      formSubmit: parsedSources.formSubmit,
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
    DOM: Stream.combine(Stream.of(navVTree), mergePageSinks("DOM")).map(div),
    HTTP: mergePageSinks("HTTP"),
    formSubmit: mergePageSinks("formSubmit"),
    router: mergePageSinks("router"),
  };
}

// Declare drivers that will perform the side-effects.
const drivers: { [name: string]: Function } = {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver(),
  formSubmit: makeFormSubmitDriver(),
  router: makeRouterDriver(createHistory(), { capture: true }),
};

// Kick-off the application!
run(main, drivers);
