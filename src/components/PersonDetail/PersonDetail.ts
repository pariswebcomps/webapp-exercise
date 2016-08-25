import Person from "../Person/Person";

import { IProps, ISinks, ISources } from "./interfaces";
import view from "./view";

import { RequestInput } from "@cycle/http/src/interfaces";
import { prop } from "ramda";
import { Stream } from "xstream";

export default function PersonDetail({HTTP, props}: ISources): ISinks {
  const personResponse$ = HTTP.select("person-detail").flatten();

  // Instantiate a new Person bound to HTTP response stream and appropriate props.
  const person$ = Person({
    profile: personResponse$.map(prop("body")),
    props: Stream.of({ className: ".col.s6.offset-s3", isDetailed: true }),
  });

  // Request person detail information to HTTP driver.
  const requestDetail$ = props.map(parseHTTPRequest);

  return {
    DOM: view(Stream.combine(person$.DOM, props)),
    HTTP: requestDetail$,
  };
}

function parseHTTPRequest({apiUrl, id}: IProps): RequestInput {
  return { category: "person-detail", url: `${apiUrl}/${id}` };
}
