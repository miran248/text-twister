import { connectRouter } from "connected-react-router";
import { createStore } from "redux";

import history from "./history";
import middleware from "./middleware";
import reducers from "./reducers";

export default () => createStore(
  connectRouter(history)(reducers),
  middleware
);
