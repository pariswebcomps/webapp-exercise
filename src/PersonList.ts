import Person from "./Person";
import SearchInput from "./SearchInput";
import { IProfile, ISearchablePerson } from "./interfaces";

import Collection from "@cycle/collection";
import { VNode, div, span } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { filter, ifElse, length, map, pipe, prop, toLower } from "ramda";
import { Stream } from "xstream";

interface IProps {
  apiUrl: string;
}

interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
  props: Stream<IProps>;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
}

export default function PersonList({DOM, HTTP, props}: ISources): ISinks {
  // Instantiate a search input element to filter list.
  const searchInput = SearchInput({ DOM });

  // Retrieve data from server.
  const personsResponse$ = HTTP.select("person-list").flatten();

  // Filter the HTTP stream (= all data) with latest value of the search input one.
  const searchedPersons$ = Stream.combine(personsResponse$, searchInput.search)
    .map(([response, search]) =>
      pipe(
        prop("body"),
        parseToSearchablePerson(search),
        filterSearchedPersons(search)
      )(response)
    );

  // Create a stream representing a Collection of Persons.
  // Additional params for Person instantiate are configured here (= props).
  // It will be updated with latest data from searchedPersons$.
  const persons$ = Collection.gather(
    Person,
    { props: Stream.of({ className: ".col.s6", isDetailed: false }) },
    searchedPersons$
  );

  // Pluck DOM outputs from every Person of the Collection into a single stream.
  const personsVTrees$ = Collection.pluck(persons$, prop("DOM"));

  return {
    DOM: Stream.combine(searchInput.search, personsVTrees$).map(renderDOM),
    HTTP: props.map(parseHTTPRequest),
  };
}

// A simple function that will output VTree of the # of persons block
const renderNumberOfPersons = ifElse(
  (n) => n > 1,
  (n) => span(".col.s6", `You have ${n} contacts`),
  (n) => span(".col.s6", `You have ${n} contact`)
);

function parseHTTPRequest({apiUrl}: IProps): RequestInput {
  return { category: "person-list", url: apiUrl };
}

function renderDOM([searchInputVTree, personsVTrees]: [VNode, VNode[]]): VNode {
  return div(".container", [
    div(".header.row", [
      renderNumberOfPersons(length(personsVTrees)),
    ]),
    div(".row", [searchInputVTree]),
    div(".row", personsVTrees),
  ]);
}

function parseToSearchablePerson(search: string) {
  return map((profile: IProfile) =>
    ({
      // `filterKey` will be matched against search term to filter inputs.
      filterKey: `${profile.firstname} ${profile.lastname}`,
      // Build an ID based on profile.id and search term so Collection is flushed anytime the
      // search term is changed => keep the Collection ordered (reset with filtered data).
      id: profile.id + search,
      profile,
    })
  );
}

function filterSearchedPersons(search: string) {
  return filter((person: ISearchablePerson) =>
    toLower(person.filterKey).indexOf(toLower(search)) > -1);
}
