import clsx from "clsx";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  BreadcrumbProvider,
  Breadcrumbs,
  Breadcrumb,
} from "ui/components/breadcrumbs";

import layout from "ui/styles/layout.scss";

import { Home } from "./home";

export function Pages() {
  return (
    <div data-testid="page" className={clsx(layout.column, layout.fill)}>
      <BreadcrumbProvider>
        <Breadcrumbs />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account">
            <Breadcrumb label="Account" />
            <Breadcrumb label="Test" to="/abc/def" />
            <h1>Account</h1>
          </Route>
          <Route path="/assets">Assets</Route>
          <Route path="/datasets">Datasets</Route>
          <Route path="/predictors">Predictors</Route>
          <Route path="/summary">Summary</Route>
          <Route path="/tables">Tables</Route>
          <Route path="/workspaces">Workspaces</Route>
          <Redirect to="/" />
        </Switch>
      </BreadcrumbProvider>
    </div>
  );
}
