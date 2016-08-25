import { SerializedForm } from "../../drivers/FormSubmit";

import { VNode } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { Stream } from "xstream";

export { IProfile } from "../../interfaces";

export interface IProps {
  id: string;
  apiUrl: string;
}

export interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
  formSubmit: Stream<SerializedForm>;
  props: Stream<IProps>;
}

export interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
  formSubmit: Stream<Event>;
  router: any;
}
