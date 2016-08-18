import Person from "./Person";
import Collection from "@cycle/collection";
import { VNode, div, span } from "@cycle/dom";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { length, map, pipe, prop } from "ramda";
import { Stream } from "xstream";

interface ISources {
  HTTP: HTTPSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
}

// A simple function that will output VTree of the # of persons block
const renderNumberOfPersons = (n) =>
  span(".col.s6", `You have ${n} contacts`);

export default function PersonList({HTTP}: ISources): ISinks {
  const personsResponse$ = HTTP.select("persons").flatten();

  const parseResponseToPersons = pipe(
    prop("body"),
    map((profile) => ({ profile: Stream.of(profile) }))
  );

  const persons$ = Collection(
    Person,
    { props: Stream.of({ className: ".col.s6", isDetailed: false }) },
    personsResponse$.map(parseResponseToPersons)
  );

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
  // For now we are firing a single request on app launch.
  const personsRequest$ = Stream.of({
    category: "persons",
    url: "http://localhost:3001/api/peoples",
  });

  return {
    DOM: containerVTree$,
    HTTP: personsRequest$,
  };
}
