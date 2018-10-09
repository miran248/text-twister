import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Switch } from "react-router";
import { Route } from "react-router-dom";

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
    <Switch>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
      <Redirect from="*" to="/"/>
    </Switch>
  </ConnectedRouter>
);
