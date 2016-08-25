import PersonDetail from "./components/PersonDetail/PersonDetail";
import PersonEdit from "./components/PersonEdit/PersonEdit";
import PersonList from "./components/PersonList/PersonList";

import { Stream } from "xstream";

const apiUrl = "http://localhost:3001/api/peoples";

const routes = {
    "/": parsedSources => PersonList({
      DOM: parsedSources.DOM,
      HTTP: parsedSources.HTTP,
      props: Stream.of({ apiUrl }),
    }),
    "/detail/:id": id => parsedSources => PersonDetail({
      HTTP: parsedSources.HTTP,
      props: Stream.of({ id, apiUrl }),
    }),
    "/edit/:id": id => parsedSources => PersonEdit({
      DOM: parsedSources.DOM,
      HTTP: parsedSources.HTTP,
      formSubmit: parsedSources.formSubmit,
      props: Stream.of({ id, apiUrl }),
    }),
};

export { routes };
