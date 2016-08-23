// This driver handle form submission events to return form data so we can handle them in our app.
//
// Here is the handled scenario:
// 1. Form emits a submit event to the sources (DOM driver)
// 2. App emits the event to the sinks (Form driver)
// 3. Form driver prevents default behavior execution
// 4. Form driver emits serialized data to the sources
// 5. App can deal with form data (e.g: send a HTTP POST request to the server)
//
// TODO:
// - It should work for apps that have more than 1 form


import * as $ from "jquery";
import { fromPairs, map, pipe, values } from "ramda";
import { Stream } from "xstream";

export type SerializedForm = { [key: string]: any };

export { makeFormSubmitDriver };

function makeFormSubmitDriver(): (submit$: Stream<Event>) => Stream<SerializedForm> {
  return formSubmitDriver;
}

function formSubmitDriver(submit$: Stream<Event>): Stream<SerializedForm> {
  submit$.addListener({
    complete: () => { },
    error: () => { },
    next: ev => {
      // Prevent form submission so we can handle it in our app.
      ev.preventDefault();
    },
  });

  // Emit a new serialized data on each submission.
  return submit$.map(pipe(getForm, serializeForm));
}

function getForm(ev: Event): JQuery {
  return $(ev.target);
}

const serializedArrayToObject = pipe(map(values), fromPairs);

function serializeForm($form: JQuery): SerializedForm {
  return serializedArrayToObject($form.serializeArray());
}
