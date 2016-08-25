import { complement, curry, isNil, prop } from "ramda";
import { Stream } from "xstream";

export const mergeSinks = curry((stream$: Stream<{}>, sinkName: string): any =>
  stream$.map(prop(sinkName))
    // Reject undefined values = streams that don't return given sinkName
    .filter(complement(isNil))
    .flatten()
);