import { VNode } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { Stream } from "xstream";

export { IProfile, ISearchablePerson } from "../../interfaces";

export interface IProps {
  apiUrl: string;
}

export interface ISources {
  DOM: DOMSource;
  HTTP: HTTPSource;
  props: Stream<IProps>;
}

export interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
}
