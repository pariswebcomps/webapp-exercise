import Person from "./Person";
import PersonList from "./PersonList";
import { VNode, makeDOMDriver } from "@cycle/dom";
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
  router: Stream<string>;
}

// Our main application logic.
// Takes observables input sources from drivers.
// Does some pure dataflow operations = the app logic.
// Returns observables output sinks to the drivers.
function main(sources: ISources): ISinks {
  const match$ = sources.router.define({
    "/": PersonList,
    // TODO: refactor Person to be able to display a detailed one
    "/detail": Person,
  });

  const page$ = match$.map(({path, value}) => {
    return value(set(lensProp("router"), sources.router.path(path), sources));
  });

  return {
    DOM: page$.map(prop("DOM")).flatten(),
    HTTP: page$.map(prop("HTTP")).flatten(),
    router: Stream.of("/"),
  };
}

// Declare drivers that will perform the side-effects.
const drivers: { [name: string]: Function } = {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver(),
  router: makeRouterDriver(createHistory()),
};

// Kick-off the application!
run(main, drivers);
