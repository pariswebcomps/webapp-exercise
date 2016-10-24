import { ISinks, ISources } from "./interfaces";
import view from "./view";

import { Stream } from "xstream";

export default function Person({profile, props}: ISources): ISinks {
  return {
    DOM: view(Stream.combine(profile, props)),

    // `name` identifies the person and can be used for filtering.
    name: profile.map(({firstname, lastname}) => `${firstname} ${lastname}`),
  };
};
