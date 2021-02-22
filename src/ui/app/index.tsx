import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Redirect, Route, Switch } from "react-router-dom";

import { Login } from "../components/login";
import { Sidebar } from "../components/sidebar";
import { Pages } from "../pages";

import { queryClient } from "./client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Redirect path="/logout" to="/login" />
        <Route path="/login">
          <Login />
        </Route>
        <Route>
          <Sidebar />
          <Pages />
        </Route>
      </Switch>
      {/**
       * ReactQueryDevtools is gated on NODE_ENV === "production",
       * but we also want to stop it from rendering at NODE_ENV === "test"
       */}
      {process.env.NODE_ENV === "development" ? (
        /* istanbul ignore next */
        <ReactQueryDevtools position="bottom-right" />
      ) : null}
    </QueryClientProvider>
  );
}
