declare module "@cycle/collection" {
  import { VNode } from "@cycle/dom";
  import Stream from "xstream";

  interface ISources {
    // I don't know how to represent a generic sources for now.
  }

  interface ISinks {
    // I don't know how to represent a generic sinks for now.
  }

  type Component = (sources: ISources) => ISinks;

  function Collection(
    Item: Component,
    sources?: ISources,
    add$?: Stream<ISources | [ISources]>
  ): Stream<any>;

  // Disable no-namespace -> following the documentation.
  // Disable no-unused-variable -> we are declaring the interface here.
  /* tslint:disable:no-namespace no-unused-variable */
  namespace Collection {
    function pluck(
      collection$: Stream<any>,
      selector: (ItemSinks: ISinks) => VNode
    ): Stream<VNode[]>;
  }
  /* tslint:enable:no-namespace no-unused-variable */

  export default Collection;
}
