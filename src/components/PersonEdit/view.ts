import { IProfile } from "./interfaces";

import { VNode, a, button, div, form, input, label, span } from "@cycle/dom";
import { Stream } from "xstream";

export default function view(profile$: Stream<IProfile>): Stream<VNode> {
  return profile$.map(renderForm);
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