import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import LoginPageCmp from "./Cmps/LoginPage/LoginPageCmp";
import ToDoListCmp from "./Cmps/ToDoList/ToDoListCmp";

const history = createBrowserHistory();

export default function RouterFile() {
  return (
    <Router history={history}>
      <main>
        <Switch>
          <Route path="/ToDoList">
            <ToDoListCmp />
          </Route>
          <Route path="/">
            <LoginPageCmp />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
