import { Redirect, Route, Switch } from "react-router";

import { useUser } from "../contexts/user";
// import { Accounts } from "./accounts";
// import { Budget } from "./budget";
import { Dashboard } from "./dashboard";
// import { Guidance } from "./guidance";
import { Login } from "./login";
// import { Profile } from "./profile";
// import { Score } from "./score";
import { Welcome } from "./welcome";

export const Pages = () => {
  const user = useUser();

  const GoHome = () => <Redirect to={user ? "/dashboard" : "/welcome"} />;

  return (
    <Switch>
      <Route path="/dashboard" component={user ? Dashboard : Login} />
      {/* <Route path="/score" component={user ? Score : Login} />
      <Route path="/guidance" component={user ? Guidance : Login} />
      <Route path="/accounts/:id?" component={user ? Accounts : Login} />
      <Route path="/budget" component={user ? Budget : Login} />
      <Route path="/profile" component={user ? Profile : Login} />
      <Route path="/login" component={user ? GoHome : Login} /> */}
      <Route path="/welcome" component={Welcome} />
      <Route path="/" component={GoHome} />
    </Switch>
  );
};

export default Pages;
