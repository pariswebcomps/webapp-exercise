import { complement, curry, filter, isNil, length, pathEq, pipe, prop, toLower } from "ramda";
import { Stream } from "xstream";

export const mergeSinks = curry((stream$: Stream<{}>, sinkName: string): any =>
  stream$.map(prop(sinkName))
    // Reject undefined values = streams that don't return given sinkName
    .filter(complement(isNil))
    .flatten()
);

export function isInString(str: string, searchedStr: string): boolean {
  return toLower(str).indexOf(toLower(searchedStr)) > -1;
}

export const numberOfVisibleVTrees = pipe(
  filter(complement(pathEq(["data", "style", "display"], "none" ))),
  length
);
