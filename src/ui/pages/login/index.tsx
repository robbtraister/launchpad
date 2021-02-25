import { RouteChildrenProps } from "react-router";

import { Page } from "ui/components/page";
import { Widget } from "ui/components/widget";

export const Login = ({ location }: RouteChildrenProps) => {
  const uri = encodeURIComponent(`${location.pathname}${location.search}`);
  return (
    <Page title="Login">
      <Widget>
        <a href={`/auth/google?redirect=${uri}`}>Google</a>
      </Widget>
      <Widget>
        <a href={`/auth/facebook?redirect=${uri}`}>Facebook</a>
      </Widget>
    </Page>
  );
};

export default Login;
