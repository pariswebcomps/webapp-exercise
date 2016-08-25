import Person from "./Person";

import { VNode, a, div, i } from "@cycle/dom";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { prop } from "ramda";
import { Stream } from "xstream";

interface IProps {
  id: string;
  apiUrl: string;
}

interface ISources {
  HTTP: HTTPSource;
  props: Stream<IProps>;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
}

export default function PersonDetail({HTTP, props}: ISources): ISinks {
  const personResponse$ = HTTP.select("person-detail").flatten();

  // Instantiate a new Person bound to HTTP response stream and appropriate props.
  const person$ = Person({
    profile: personResponse$.map(prop("body")),
    props: Stream.of({ className: ".col.s6.offset-s3", isDetailed: true }),
  });

  return {
    DOM: Stream.combine(props, person$.DOM).map(renderDOM),
    HTTP: props.map(parseHTTPRequest),
  };
}

function renderDOM([{id}, personVTree]: [IProps, VNode]): VNode {
  return div(".container", [
    div(".row", [personVTree]),
    div(".fixed-action-btn.horizontal.edit-btn", [
      a(".btn-floating.btn-large.red", { "attrs": { "href": `/edit/${id}` } }, [
        i(".large.material-icons", "mode_edit"),
      ]),
    ]),
  ]);
}

function parseHTTPRequest({apiUrl, id}: IProps): RequestInput {
  return { category: "person-detail", url: `${apiUrl}/${id}` };
}
