import { VNode, div, i, input, label } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  search: Stream<string>;
}

const inputVTree = div(".input-field", [
  i(".material-icons.prefix", "search"),
  input(".input", { "attrs": { "name": "search", "type": "text" } }),
  label(".active", { "attrs": { "for": "search" } }, "Search"),
]);

export default function SearchInput({DOM}: ISources): ISinks {
  const inputChange$ = DOM.select(".input").events("input");
  const search$ = inputChange$.map(ev => (<HTMLSelectElement> ev.target).value);

  return {
    DOM: Stream.of(inputVTree),
    search: search$.startWith(""),
  };
}
