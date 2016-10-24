import { VNode } from "@cycle/dom";
import { HTTPSource, RequestInput } from "@cycle/http/src/interfaces";
import { Stream } from "xstream";

export interface IProps {
  id: string;
  apiUrl: string;
}

export interface ISources {
  HTTP: HTTPSource;
  props: Stream<IProps>;
}

export interface ISinks {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
}
