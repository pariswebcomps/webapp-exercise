import { IProfile, IProps } from "./interfaces";

import { VNode, a, div, h3, i, img, span } from "@cycle/dom";
import { always, identity, map, mapObjIndexed, pipe, values, when } from "ramda";
import { Stream } from "xstream";

export default function view(person$: Stream<[IProfile, IProps]>): Stream<VNode> {
  return person$.map(renderPerson);
}

const renderLargeBtns = map((text) => a(".btn-large", text));

const renderLinks = pipe(
  mapObjIndexed((link, type) => a(
    { "attrs": { "href": link } },
    [img(".pad-horizontal", { "attrs": { "src": `/src/images/md-${type}.svg` } })]
  )),
  values
);

function renderUsername({id, firstname, lastname}: IProfile): VNode {
  return a(
    ".username",
    { "attrs": { "href": `/detail/${id}` } },
    [
      span(`${firstname} `),
      span(".uppercase", lastname),
    ]
  );
}

function renderContact({email, phone}: IProfile): VNode {
  return div(".pad-top", [
    div([
      img({ "attrs": { "src": "/src/images/md-email.svg" } }),
      span(` ${email}`),
    ]),
    div([
      img({ "attrs": { "src": "/src/images/md-phone.svg" } }),
      span(` ${phone}`),
    ]),
  ]);
}

function renderManager(manager: string): VNode {
  return div([
    span(".label", "Manager: "),
    span(manager),
  ]);
}

function renderPicture(photo: string): VNode {
  return img(".picture", { "attrs": { "src": photo } });
}

function renderAdminIcons(id: string): VNode {
  return div([
    img(".icon", { "attrs": { "src": "/src/images/md-map.svg" } }),
    a(
      { "attrs": { "href": `/edit/${id}` } },
      [i(".icon.material-icons", "mode_edit")]
    ),
    a(
      { "attrs": { "href": "/" } },
      [i(".icon.material-icons", "delete")]
    ),
  ]);
}

function renderDetails({skills, links}: IProfile): VNode {
  return div([
    div(".skills", [
      h3("Skills"),
      ...renderLargeBtns(skills),
    ]),
    div(".row.center-align", renderLinks(links)),
  ]);
}

function renderPerson([profile, {isDetailed, className = ""}]: [IProfile, IProps]): VNode {
  const renderDetailsWhen = when(
    identity,
    always(renderDetails(profile))
  );

  return div(className, [
    div(".card-panel", [
      div(".row", [
        div(".col.s7", [
          div(".layout.vertical.flex", [
            renderUsername(profile),
          ]),
          renderContact(profile),
          renderManager(profile.manager),
        ]),
        div(".col.s5", [
          renderPicture(profile.photo),
          renderAdminIcons(profile.id),
        ]),
      ]),
      renderDetailsWhen(isDetailed),
    ]),
  ]);
}
