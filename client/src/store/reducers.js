import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import sessions from "../sessions/reducers";

export default (history) => combineReducers({
  router: connectRouter(history),

  ...sessions,
});
