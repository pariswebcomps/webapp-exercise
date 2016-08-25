import { IProfile } from "../../interfaces";
import { VNode } from "@cycle/dom";
import { Stream } from "xstream";

export { IProfile } from "../../interfaces";

export interface IProps {
  isDetailed: boolean;
  className: string;
}

export interface ISources {
  profile: Stream<IProfile>;
  props: Stream<IProps>;
}

export interface ISinks {
  DOM: Stream<VNode>;
}
