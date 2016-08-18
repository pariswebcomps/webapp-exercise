import { IProfile } from "./interfaces";

import { VNode, a, div, form, input, label, span } from "@cycle/dom";
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

const renderCardAction = () =>
  div(".card-action", [
    // TODO: implement cancel (back to history)
    a({ "attrs": { "href": "/" } }, "Cancel"),
    // TODO: implement submit
    a({ "attrs": { "href": "/" } }, "Submit"),
  ]);

const renderCardContent = ({firstname, lastname, email, phone}) =>
  div(".card-content", [
    span(".card-title", "Contact information"),
    form([
      div(".row", [
        div(".input-field.col.s12", [
          input("#title", { "attrs": { "type": "text", "value": firstname } }),
          label({ "attrs": { "for": "title" } }, "First name"),
        ]),
      ]),
      div(".row", [
        div(".input-field.col.s12", [
          input("#last-name", { "attrs": { "type": "text", "value": lastname } }),
          label({ "attrs": { "for": "last-name", "data-error": "wrong", "data-success": "right" } }, "Last name"),
        ]),
      ]),
      div(".row", [
        div(".input-field.col.s12", [
          input("#email", { "attrs": { "type": "text", "value": email } }),
          label({ "attrs": { "for": "email" } }, "Email"),
        ]),
      ]),
      div(".row", [
        div(".input-field.col.s12", [
          input("#phone", { "attrs": { "type": "text", "value": phone } }),
          label({ "attrs": { "for": "phone" } }, "Phone number"),
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

export default function PersonEdit({HTTP, props}: ISources): ISinks {
  const profile$ = HTTP.select("person-edit").flatten().map(prop("body"));

  // Fetch the API for person profile.
  const personsRequest$ = props.map(({apiUrl, id}) =>
    ({ category: "person-edit", url: `${apiUrl}/${id}` }));

  return {
    DOM: renderForm(profile$),
    HTTP: personsRequest$,
  };
}
