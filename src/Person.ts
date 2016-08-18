import { IProfile } from "./interfaces";

import { VNode, a, div, h3, i, img, span } from "@cycle/dom";
import { always, identity, map, mapObjIndexed, pipe, values, when } from "ramda";
import { Stream } from "xstream";

interface IProps {
  isDetailed: boolean;
  className: string;
}

interface ISources {
  profile: Stream<IProfile>;
  props: Stream<IProps>;
}

interface ISinks {
  DOM: Stream<VNode>;
}

const renderLargeBtns = map((text) => a(".btn-large", text));

const renderUsername = ({id, firstname, lastname}) =>
  a(
    ".username",
    { "attrs": { "href": `/detail/${id}` } },
    [
      span(`${firstname} `),
      span(".uppercase", lastname),
    ]
  );

const renderContact = ({email, phone}) =>
  div(".pad-top", [
    div([
      img({ "attrs": { "src": "/src/images/md-email.svg" } }),
      span(` ${email}`),
    ]),
    div([
      img({ "attrs": { "src": "/src/images/md-phone.svg" } }),
      span(` ${phone}`),
    ]),
  ]);

const renderManager = (manager) =>
  div([
    span(".label", "Manager: "),
    span(manager),
  ]);

const renderPicture = (photo) =>
  img(".picture", { "attrs": { "src": photo } });

const renderAdminIcons = (id) =>
  div([
    img(".icon", { "attrs": { "src": "/src/images/md-map.svg" } }),
    a(
      { "attrs": { "href": `edit/${id}` } },
      [i(".icon.material-icons", "mode_edit")]
    ),
    a(
      { "attrs": { "href": "/" } },
      [i(".icon.material-icons", "delete")]
    ),
  ]);

const renderDetails = ({skills, links}) =>
  div([
    div(".skills", [
      h3("Skills"),
      ...renderLargeBtns(skills),
    ]),
    div(".row.center-align", renderLinks(links)),
  ]);

const renderLinks = pipe(
  mapObjIndexed((link, type) =>
    a(
      { "attrs": { "href": link } },
      [
        img(
          ".pad-horizontal",
          { "attrs": { "src": `/src/images/md-${type}.svg` } }
        ),
      ]
    )
  ),
  values
);

function renderPerson(
  profile$: Stream<IProfile>,
  props$: Stream<IProps>
): Stream<VNode> {
  return Stream.combine(profile$, props$).map(
    ([
      {id, email, firstname, lastname, links, manager, phone, photo, skills},
      {isDetailed, className = ""},
    ]) => {
      const renderDetailsWhen = when(
        identity,
        always(renderDetails({ skills, links }))
      );

      return div(className, [
        div(".card-panel", [
          div(".row", [
            div(".col.s7", [
              div(".layout.vertical.flex", [
                renderUsername({ id, firstname, lastname }),
              ]),
              renderContact({ email, phone }),
              renderManager(manager),
            ]),
            div(".col.s5", [
              renderPicture(photo),
              renderAdminIcons(id),
            ]),
          ]),
          renderDetailsWhen(isDetailed),
        ]),
      ]);
    }
  );
}

export default function Person({profile, props}: ISources): ISinks {
  return {
    DOM: renderPerson(profile, props),
  };
};
