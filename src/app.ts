import { VNode, div, h1, input, label, makeDOMDriver } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { run } from "@cycle/xstream-run";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
}

interface ISinks {
  DOM: Stream<VNode>;
}

function intent(DOM: DOMSource): Stream<string> {
  return DOM.select(".field").events("input")
    .map(ev => (ev.target as HTMLInputElement).value);
}

function model(name$: Stream<string>) {
  return name$.startWith("");
}

function view(name$: Stream<string>) {
  return name$.map(name =>
    div(".container", [
      label("Name: "),
      input(".field", { attrs: { type: "text", value: name } }),
      h1(name ? `Hello, ${name}!` : "Please enter your name..."),
    ])
  );
}

function main(sources: ISources): ISinks {
  return {
    DOM: view(model(intent(sources.DOM))),
  };
}

run(main, {
  DOM: makeDOMDriver("#app"),
});
