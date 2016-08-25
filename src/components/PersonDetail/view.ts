import { IProps } from "./interfaces";

import { VNode, a, div, i } from "@cycle/dom";
import { Stream } from "xstream";

export default function view(personDetail$: Stream<[VNode, IProps]>): Stream<VNode> {
  return personDetail$.map(renderPersonDetail);
}

function renderPersonDetail([personVTree, {id}]: [VNode, IProps]): VNode {
  return div(".container", [
    div(".row", [personVTree]),
    div(".fixed-action-btn.horizontal.edit-btn", [
      a(".btn-floating.btn-large.red", { "attrs": { "href": `/edit/${id}` } }, [
        i(".large.material-icons", "mode_edit"),
      ]),
    ]),
  ]);
}
