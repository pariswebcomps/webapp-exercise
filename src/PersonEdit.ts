import { SerializedForm } from "./drivers/FormSubmit";
import { IProfile } from "./interfaces";

import { VNode, a, button, div, form, input, label, span } from "@cycle/dom";
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
  formSubmit: Stream<SerializedForm>;
  props: Stream<IProps>;
}

interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
  formSubmit: Stream<Event>;
  router: any;
}

export default function PersonEdit({DOM, HTTP, props, formSubmit}: ISources): ISinks {
  const profile$ = HTTP.select("person-edit").flatten().map(prop("body"));
  const update$ = HTTP.select("person-edit-update").flatten().map(prop("body"));
  const cancelClick$ = DOM.select(".cancel").events("click");
  const formSubmit$ = DOM.select(".form").events("submit");

  // Fetch the API for person profile.
  const personsRequest$ = props.map(({apiUrl, id}) =>
    ({ category: "person-edit", url: `${apiUrl}/${id}` }));

  // Update person data on form submission.
  const submitFormRequest$ = Stream.combine(props, formSubmit)
    .map(([{apiUrl, id}, data]) =>
      ({
        category: "person-edit-update",
        method: "PUT",
        send: data,
        type: "application/json",
        url: `${apiUrl}/${id}`,
      })
    );

  // Go to detail view after person update.
  const goToDetailView$ = update$.map(({id}) => `/detail/${id}`);

  // Go back to previous page when we click on cancel.
  const goBack$ = cancelClick$.mapTo(({ type: "goBack" }));

  return {
    DOM: profile$.map(renderForm),
    HTTP: Stream.merge(personsRequest$, submitFormRequest$),
    formSubmit: formSubmit$,
    router: Stream.merge(goToDetailView$, goBack$),
  };
}

const renderCardActionVTree = div(".card-action", [
  a(
    ".cancel.btn.waves-effect.waves-light.deep-orange.m-right",
    "Cancel"
  ),
  button(
    ".btn.waves-effect.waves-light",
    { "attrs": { "type": "submit", "name": "action" } },
    "Submit"
  ),
]);

function renderCardContent({firstname, lastname, email, phone}: IProfile): VNode {
  return div(".card-content", [
    span(".card-title", "Contact information"),
    div(".row", [
      div(".input-field.col.s12", [
        input(
          "#title.validate",
          { "attrs": { "name": "firstname", "type": "text", "value": firstname, "required": true } }
        ),
        label(".active", { "attrs": { "for": "firstname" } }, "First name*"),
      ]),
    ]),
    div(".row", [
      div(".input-field.col.s12", [
        input(
          "#last-name.validate",
          { "attrs": { "name": "lastname", "type": "text", "value": lastname, "required": true } }
        ),
        label(".active", { "attrs": { "for": "lastname" } }, "Last name*"),
      ]),
    ]),
    div(".row", [
      div(".input-field.col.s12", [
        input(
          "#email.validate",
          { "attrs": { "name": "email", "type": "email", "value": email } }
        ),
        label(
          ".active",
          { "attrs": { "for": "email", "data-error": "This email address is not valid" } },
          "Email"
        ),
      ]),
    ]),
    div(".row", [
      div(".input-field.col.s12", [
        input(
          "#phone.validate",
          { "attrs": { "name": "phone", "type": "tel", "value": phone, "pattern": "[0-9]{10}" } }
        ),
        label(
          ".active",
          {
            "attrs": {
              "for": "phone",
              "data-error": "This phone number is not valid. Expected format: 10 digits",
            },
          },
          "Phone number"
        ),
      ]),
    ]),
  ]);
}

function renderForm(profile: IProfile): VNode {
  return div(".container", [
    div(".row.movieCardForm", [
      form(
        ".form.card.col.s12.z-depth-3",
        { "attrs": { "action": `/api/peoples/${profile.id}` } },
        [
          renderCardContent(profile),
          renderCardActionVTree,
        ]
      ),
    ]),
  ]);
}
