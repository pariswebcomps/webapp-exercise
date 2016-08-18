import Person from "./Person";

import Collection from "@cycle/collection";
import { VNode, div, span } from "@cycle/dom";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { length, map, pipe, prop } from "ramda";
import { Stream } from "xstream";

interface IProps {
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

// A simple function that will output VTree of the # of persons block
const renderNumberOfPersons = (n) =>
  span(".col.s6", `You have ${n} contacts`);

export default function PersonList({HTTP, props}: ISources): ISinks {
  const personsResponse$ = HTTP.select("person-list").flatten();

  // Create a parser function that will turn HTTP response into appropriate
  // params to instantiate Persons.  
  const parseResponseToPersons = pipe(
    prop("body"),
    map((profile) => ({ profile: Stream.of(profile) }))
  );

  // Create a stream representing a Collection of Persons.
  // It is bound to the HTTP response stream.
  // Additional params for Person instantiate are configured here (= props).
  const persons$ = Collection(
    Person,
    { props: Stream.of({ className: ".col.s6", isDetailed: false }) },
    personsResponse$.map(parseResponseToPersons)
  );

  // Pluck DOM outputs from every Person of the Collection into a single stream.  
  const personsVTrees$ = Collection.pluck(persons$, prop("DOM"));

  const containerVTree$ = personsVTrees$.map((personsVTrees) =>
    div(".container", [
      div(".header.row", [
        renderNumberOfPersons(length(personsVTrees)),
      ]),
      div(".row", personsVTrees),
    ])
  );

  // Fetch the API for all persons.
  const personsRequest$ = props.map(({ apiUrl }) =>
    ({ category: "person-list", url: apiUrl }));

  return {
    DOM: containerVTree$,
    HTTP: personsRequest$,
  };
}
