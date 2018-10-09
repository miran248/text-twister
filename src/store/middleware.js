import axios from "axios";
import { routerMiddleware } from "connected-react-router";
import { compose, applyMiddleware } from "redux";
import { createLogicMiddleware } from "redux-logic";

import history from "./history";
import logics from "./logics";

const logicMiddleware = createLogicMiddleware(logics, {
  httpClient: axios,
});

const middleware = applyMiddleware(
  routerMiddleware(history),
  logicMiddleware
);

export default (typeof devToolsExtension === "undefined")
  ? middleware
  : compose(middleware, devToolsExtension());
