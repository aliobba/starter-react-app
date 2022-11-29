import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import Users from "../pages/users";
import Login from "../pages/login";

export default function Router() {
  const access_token = Cookies.get('access_token');

  if (access_token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/reactjs-workshop/" component={Users} />
          <Redirect exact to="/reactjs-workshop/" />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/reactjs-workshop/" component={Login} />
        <Redirect exact to="/reactjs-workshop/" />
      </Switch>
    </BrowserRouter>
  );
}
