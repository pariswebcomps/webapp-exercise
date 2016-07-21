import { VNode, a, div, h3, i, img, li, makeDOMDriver, nav, span, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { run } from "@cycle/xstream-run";
// Use ramda instead of lodash/fp because it can't make the latter
// to work with TypeScript easily.
import { map, mapObjIndexed, pipe, values } from "ramda";
import { Stream } from "xstream";

interface ISources {
  DOM: DOMSource;
}

interface ISinks {
  DOM: Stream<VNode>;
}

// A function that returns the hyperscript representation of the navigation.
// Anytime the input stream emits an event, it will emit a new representation
// in the output stream.
function renderNav(input$: Stream<any>): Stream<VNode> {
  return input$.map(() =>
    nav(".bg-color-primary", [
      div(".nav-wrapper", [
        a({ "attrs": { "href": "list.html" } }, [
          img(
            ".logo",
            {
              "attrs": {
                "src": "src/images/logo-people.svg",
                "className": "logo",
              },
            }
          ),
        ]),
        ul(".right.hide-on-med-and-down", [
          li([
            a({ "attrs": { "href": "list.html" } }, [`Peoples`]),
          ]),
        ]),
      ]),
    ])
  );
}

function renderContainer(input$: Stream<any>): Stream<VNode> {
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

  return input$.map(({email, firstname, lastname, links, manager, phone, photo, skills}) =>
    div(".container", [
      div(".row", [
        div(".col.s6.offset-s3", [
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
        ]),
      ]),
    ])
  );
}

// Our main application logic.
// Takes observables input sources from drivers.
// Does some pure dataflow operations = the app logic.
// Returns observables output sinks to the drivers.
function main(sources: ISources): ISinks {
  const people$ = Stream.of({
    "id": "5763cd4d9d2a4f259b53c901",
    "photo": "https://randomuser.me/portraits/women/59.jpg",
    "firstname": "Leanne",
    "lastname": "Woodard",
    "entity": "BIOSPAN",
    "email": "Leanne.Woodard@BIOSPAN.com",
    "skills": [
      "pariatur",
      "ipsum",
      "laboris",
      "nostrud",
      "elit",
    ],
    "phone": "0784112248",
    "links": {
      "twitter": "https://twitter.com/laboris",
      "slack": "https://slack.com/fugiat",
      "github": "https://github.com/velit",
      "linkedin": "https://www.linkedin.com/in/voluptate",
    },
    "isManager": false,
    "manager": "Erika",
    "managerId": "5763cd4d3b57c672861bfa1f",
  });

  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      renderNav(Stream.of("")),
      renderContainer(people$)
    ).map(div),
  };
}

// Declare drivers that will perform the side-effects.
const drivers = {
  DOM: makeDOMDriver("#app"),
};

// Kick-off the application!
run(main, drivers);
