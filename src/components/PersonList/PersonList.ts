import { IPersonSinks, IProps, ISinks, ISources } from "./interfaces";
import view from "./view";

import { isSearchInString } from "../../utils";
import Person from "../Person/Person";
import SearchInput from "../SearchInput/SearchInput";

import Collection from "@cycle/collection";
import { RequestInput } from "@cycle/http/src/interfaces";
import { assoc, map, pipe, prop } from "ramda";
import { Stream } from "xstream";

export default function PersonList({DOM, HTTP, props}: ISources): ISinks {
  // Instantiate a search input element to filter list.
  const searchInput = SearchInput({ DOM });

  // Retrieve data from server.
  const personsResponse$ = HTTP.select("person-list").flatten();

  // Filter the HTTP stream (= all data) with latest value of the search input one.
  const parseResponseToPersons = pipe(
    prop("body"),
    map((profile) => ({ profile: Stream.of(profile) }))
  );

  // Create a stream representing a Collection of Persons.
  // Additional params for Person instantiate are configured here (= props).
  const persons$ = Collection(
    Person,
    { props: Stream.of({ className: ".col.s6", isDetailed: false }) },
    personsResponse$.map(parseResponseToPersons)
  );

  // Pluck DOM outputs from every Person of the Collection into a single stream.
  const personsVTrees$ = Collection.pluck(
    persons$,
    // Filter VTree output stream regarding the search input.
    (person: IPersonSinks) => Stream.combine(person.DOM, person.name, searchInput.search)
      .map(parsePersonVTree)
  );

  // Request list of person to HTTP driver.
  const requestList$ = props.map(parseHTTPRequest);

  return {
    DOM: view(Stream.combine(searchInput.DOM, personsVTrees$)),
    HTTP: requestList$,
  };
}

function parseHTTPRequest({apiUrl}: IProps): RequestInput {
  return { category: "person-list", url: apiUrl };
}

// Return appropriate VTree regarding if search string matches person name.
function parsePersonVTree([VTree, name, search]) {
  if (isSearchInString(name, search)) {
    return VTree;
  }

  const hiddenVTreeData = assoc("style", { display: "none" }, VTree.data);

  return assoc("data", hiddenVTreeData, VTree);
}
