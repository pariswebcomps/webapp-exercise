import { VNode, a, div, h3, i, img, span } from "@cycle/dom";
import { map, mapObjIndexed, pipe, values } from "ramda";
import { Stream } from "xstream";

interface ISources {
  profile: Stream<any>;
}

interface ISinks {
  DOM: Stream<VNode>;
}

const renderLinks = pipe(
  mapObjIndexed((link, type) =>
    a(
      { "attrs": { "href": link } },
      [
        img(
          ".pad-horizontal",
          { "attrs": { "src": `src/images/md-${type}.svg` } }
        ),
      ],
    )
  ),
  values
);

const renderLargeBtns = map((text) => a(".btn-large", text));

function renderPerson(input$: Stream<any>): Stream<VNode> {
  return input$.map(
    ({email, firstname, lastname, links, manager, phone, photo, skills}) =>
      div(".card-panel", [
        div(".row", [
          div(".col.s7", [
            div(".layout.vertical.flex", [
              a(
                ".username",
                { "attrs": { "src": "detail.html" } },
                [
                  span(`${firstname} `),
                  span(".uppercase", lastname),
                ],
              ),
            ]),
            div(".pad-top", [
              div([
                img({ "attrs": { "src": "src/images/md-email.svg" } }),
                span(` ${email}`),
              ]),
              div([
                img({ "attrs": { "src": "src/images/md-phone.svg" } }),
                span(` ${phone}`),
              ]),
            ]),
            div([
              div([
                span(".label", "Manager: "),
                span(manager),
              ]),
            ]),
          ]),
          div(".col.s5", [
            img(
              ".picture",
              { "attrs": { "src": photo } },
            ),
            img(".icon", { "attrs": { "src": "src/images/md-map.svg" } }),
            a(
              { "attrs": { "href": "edit.html" } },
              [i(".icon.material-icons", "mode_edit")],
            ),
            a(
              { "attrs": { "href": "list.html" } },
              [i(".icon.material-icons", "delete")],
            ),
          ]),
        ]),
        div(".skills", [
          h3("Skills"),
          ...renderLargeBtns(skills),
        ]),
        div(".row.center-align", renderLinks(links)),
      ]),
  );
}

export default function Person(sources: ISources): ISinks {
  return {
    DOM: renderPerson(sources.profile),
  };
};
