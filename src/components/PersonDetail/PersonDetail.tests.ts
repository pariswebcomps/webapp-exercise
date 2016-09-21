import * as test from "tape";

import { parseHTTPRequest } from "./PersonDetail";

test.only("parseHTTPRequest", (t) => {
  const expected = { category: "person-detail", url: "http://peoples.com/api/3" };
  const actual = parseHTTPRequest({ apiUrl: "http://peoples.com/api", id: "3" });
  const message = "should parse props into proper request object";

  t.deepEqual(expected, actual, message);
  t.end();
});
