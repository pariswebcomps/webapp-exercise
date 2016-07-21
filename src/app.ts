import { VNode, a, div, h3, i, img, li, makeDOMDriver, nav, span, ul } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { run } from "@cycle/xstream-run";
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
  return input$.map(() =>
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
                      span("Bob "),
                      span(".uppercase", "Dylan"),
                    ],
                  ),
                ]),
                div(".pad-top", [
                  div([
                    img({ "attrs": { "src": "src/images/md-email.svg" } }),
                    span(" bobo@soc.com"),
                  ]),
                  div([
                    img({ "attrs": { "src": "src/images/md-phone.svg" } }),
                    span(" 0949494994"),
                  ]),
                ]),
                div([
                  div([
                    span(".label", "Manager: "),
                    span("Paul"),
                  ]),
                  div([
                    span(".label", "Location: "),
                    span("Paris"),
                  ]),
                ]),
              ]),
              div(".col.s5", [
                img(
                  ".picture",
                  {
                    "attrs": {
                      "src": "https://randomuser.me/portraits/men/59.jpg",
                    },
                  },
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
              a(".btn-large", "JS"),
              a(".btn-large", "HTML5"),
              a(".btn-large", "CSS3"),
            ]),
            div(".row.center-align", [
              img(
                ".pad-horizontal",
                { "attrs": { "src": "src/images/md-twitter.svg" } }
              ),
              img(
                ".pad-horizontal",
                { "attrs": { "src": "src/images/md-slack.svg" } }
              ),
              img(
                ".pad-horizontal",
                { "attrs": { "src": "src/images/md-github.svg" } }
              ),
              img(
                ".pad-horizontal",
                { "attrs": { "src": "src/images/md-linkedin.svg" } }
              ),
            ]),
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
  return {
    // Combine all views into a single container to render within #app.
    DOM: Stream.combine(
      renderNav(Stream.of("")),
      renderContainer(Stream.of(""))
    ).map(div),
  };
}

// Declare drivers that will perform the side-effects.
const drivers = {
  DOM: makeDOMDriver("#app"),
};

// Kick-off the application!
run(main, drivers);
