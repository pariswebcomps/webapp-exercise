import Person from "./Person";
import { VNode, a, div, img, li, nav, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { prop } from "ramda";
import { Stream } from "xstream";

interface IProps {
  id: String;
}

interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
  props: Stream<IProps>;
  router: any;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
}

// A stream containing the hyperscript representation of the navigation.
const navVTree$ = Stream.of(
  nav(".bg-color-primary", [
    div(".nav-wrapper", [
      a({ "attrs": { "href": "/" } }, [
        img(
          ".logo",
          {
            "attrs": {
              "src": "/src/images/logo-people.svg",
              "className": "logo",
            },
          }
        ),
      ]),
      ul(".right.hide-on-med-and-down", [
        li([
          a({ "attrs": { "href": "/" } }, [`Peoples`]),
        ]),
      ]),
    ]),
  ])
);

export default function PersonDetail({HTTP, props}: ISources): ISinks {
  const personResponse$ = HTTP.select("person").flatten();

  const person$ = Person({
    profile: personResponse$.map(prop("body")),
    props: Stream.of({ className: ".col.s6.offset-s3", isDetailed: true }),
  });

  const containerVTree$ = person$.DOM.map((personVTree) =>
    div(".container", [
      div(".row", [personVTree]),
    ])
  );

  // Fetch the API for person detail.
  const personsRequest$ = props
    .map(({id}) => ({
      category: "person",
      url: `http://localhost:3001/api/peoples/${id}`,
    }));

  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      navVTree$,
      containerVTree$
    ).map(div),
    // Trigger HTTP requests.
    HTTP: personsRequest$,
  };
}
