import { SerializedForm } from "../../drivers/FormSubmit";

import { IProps, ISinks, ISources } from "./interfaces";
import view from "./view";

import { RequestInput } from "@cycle/http/src/interfaces";
import { prop } from "ramda";
import { Stream } from "xstream";

export default function PersonEdit({DOM, HTTP, props, formSubmit}: ISources): ISinks {
  const profile$ = HTTP.select("person-edit").flatten().map(prop("body"));
  const update$ = HTTP.select("person-edit-update").flatten().map(prop("body"));
  const cancelClick$ = DOM.select(".cancel").events("click");
  const formSubmit$ = DOM.select(".form").events("submit");

  // Fetch the API for person profile.
  const personsRequest$ = props.map(({apiUrl, id}) =>
    ({ category: "person-edit", url: `${apiUrl}/${id}` }));

  // Update person data on form submission.
  const submitFormRequest$ = Stream.combine(props, formSubmit).map(parseSubmitFormHTTPRequest);

  // Go to detail view after person update.
  const goToDetailView$ = update$.map(({id}) => `/detail/${id}`);

  // Go back to previous page when we click on cancel.
  const goBack$ = cancelClick$.mapTo(({ type: "goBack" }));

  return {
    DOM: view(profile$),
    HTTP: Stream.merge(personsRequest$, submitFormRequest$),
    formSubmit: formSubmit$,
    router: Stream.merge(goToDetailView$, goBack$),
  };
}

function parseSubmitFormHTTPRequest ([{apiUrl, id}, data]: [IProps, SerializedForm]): RequestInput {
  return {
    category: "person-edit-update",
    method: "PUT",
    send: data,
    type: "application/json",
    url: `${apiUrl}/${id}`,
  };
}
