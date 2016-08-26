import { VNode, div, span } from "@cycle/dom";
import { ifElse, length } from "ramda";
import { Stream } from "xstream";

export default function view(state$: Stream<[VNode, VNode[]]>): Stream<VNode> {
  return state$.map(renderDOM);
}

// A simple function that will output VTree of the # of persons block
const renderNumberOfPersons = ifElse(
  (n) => n > 1,
  (n) => span(".col.s6", `You have ${n} contacts`),
  (n) => span(".col.s6", `You have ${n} contact`)
);

function renderDOM([searchInputVTree, personsVTrees]: [VNode, VNode[]]): VNode {
  return div(".container", [
    div(".header.row", [
      renderNumberOfPersons(length(personsVTrees)),
    ]),
    div(".row", [searchInputVTree]),
    div(".row", personsVTrees),
  ]);
}
