import { IProfile } from "./interfaces";

import { VNode, a, div, form, input, label, span } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { prop } from "ramda";
import { Stream } from "xstream";

interface IProps {
  id: string;
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
  router: any;
}

const renderCardAction = () =>
  div(".card-action", [
    // Handle navigation with router driver to go back to previous page.
    a(".cancel", { "attrs": { "href": "#" } }, "Cancel"),
    // TODO: implement submit
    a({ "attrs": { "href": "/" } }, "Submit"),
  ]);

const renderCardContent = ({firstname, lastname, email, phone}) =>
  div(".card-content", [
    span(".card-title", "Contact information"),
    form([
      div(".row", [
        div(".input-field.col.s12", [
          input("#title.validate", { "attrs": { "type": "text", "value": firstname } }),
          label(".active", { "attrs": { "for": "title" } }, "First name"),
        ]),
      ]),
      div(".row", [
        div(".input-field.col.s12", [
          input("#last-name.validate", { "attrs": { "type": "text", "value": lastname } }),
          label(".active", { "attrs": { "for": "last-name" } }, "Last name"),
        ]),
      ]),
      div(".row", [
        div(".input-field.col.s12", [
          input("#email.validate", { "attrs": { "type": "text", "value": email } }),
          label(".active", { "attrs": { "for": "email" } }, "Email"),
        ]),
      ]),
      div(".row", [
        div(".input-field.col.s12", [
          input("#phone.validate", { "attrs": { "type": "text", "value": phone } }),
          label(".active", { "attrs": { "for": "phone" } }, "Phone number"),
        ]),
      ]),
    ]),
  ]);

function renderForm(
  profile$: Stream<IProfile>
): Stream<VNode> {
  return profile$.map((profile) =>
    div(".container", [
      div(".row.movieCardForm", [
        div(".col.s12.card.z-depth-3", [
          renderCardContent(profile),
          renderCardAction(),
        ]),
      ]),
    ])
  );
}

export default function PersonEdit({DOM, HTTP, props}: ISources): ISinks {
  const profile$ = HTTP.select("person-edit").flatten().map(prop("body"));
  const cancelClick$ = DOM.select(".cancel").events("click");

  // Fetch the API for person profile.
  const personsRequest$ = props.map(({apiUrl, id}) =>
    ({ category: "person-edit", url: `${apiUrl}/${id}` }));

  return {
    DOM: renderForm(profile$),
    HTTP: personsRequest$,
    // Every time we click on cancel, go back in history.
    router: cancelClick$.mapTo(({type: "goBack"})),
  };
}
