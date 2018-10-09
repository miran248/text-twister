import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { Root } from "./components";
import routes from "./routes";
import history from "./store/history";

const RouteWithSubRoutes = (route) => (
  <Route
    exact={route.exact || false}
    path={route.path}
    render={(props) => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default () => (
  <ConnectedRouter history={history}>
    <Root>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
    </Root>
  </ConnectedRouter>
);
