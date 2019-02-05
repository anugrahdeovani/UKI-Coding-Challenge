import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/employees" render={() => <Dashboard />} />
        <Dashboard />
      </Switch>
    </main>
  );
};
export default Main;
