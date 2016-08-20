import { Stream } from "xstream";

export { makePreventDefaultDriver };

function makePreventDefaultDriver(): Function {
  return preventDefaultDriver;
};

function preventDefaultDriver(prevented$: Stream<any>): Stream<any> {
  prevented$.addListener({
    complete: () => { },
    error: () => { },
    next: ev => {
      ev.preventDefault();
      if (ev.type === "blur") {
        ev.target.focus();
      }
    },
  });

  return Stream.empty();
};
