import { IProfile, IProps, ISearchablePerson, ISinks, ISources } from "./interfaces";
import view from "./view";

import Person from "../Person/Person";
import SearchInput from "../SearchInput/SearchInput";

import Collection from "@cycle/collection";
import { RequestInput } from "@cycle/http/src/interfaces";
import { filter, map, pipe, prop, toLower } from "ramda";
import { Stream } from "xstream";

export default function PersonList({DOM, HTTP, props}: ISources): ISinks {
  // Instantiate a search input element to filter list.
  const searchInput = SearchInput({ DOM });

  // Retrieve data from server.
  const personsResponse$ = HTTP.select("person-list").flatten();

  // Filter the HTTP stream (= all data) with latest value of the search input one.
  const searchedPersons$ = Stream.combine(personsResponse$, searchInput.search).map(getSearchedPersons);

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

function getSearchedPersons([response, search]: [{ body: IProfile[] }, string]): ISearchablePerson[] {
  return pipe(
    prop("body"),
    parseToSearchablePerson(search),
    filterPersonsFrom(search)
  )(response);
}

function parseToSearchablePerson(search: string): (profile: IProfile[]) => ISearchablePerson[] {
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

function filterPersonsFrom(search: string): (person: ISearchablePerson[]) => ISearchablePerson[] {
  return filter((person: ISearchablePerson) =>
    toLower(person.filterKey).indexOf(toLower(search)) > -1);
}
