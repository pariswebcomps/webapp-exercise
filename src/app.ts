import { SerializedForm, makeFormSubmitDriver } from "./drivers/FormSubmit";

import { routes } from "./router";
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
  // Configure routing.
  const page$ = sources.router.define(routes)
    // For each route, init bound component (= value) with sources.
    .map(({path, value}) => value(
      // Router source is resolved from the path to enable history.
      set(lensProp("router"), sources.router.path(path), sources)
    ));

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
