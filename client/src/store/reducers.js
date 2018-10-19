import { combineReducers } from "redux";

import sessions from "../sessions/reducers";

export default combineReducers({
  ...sessions,
});
