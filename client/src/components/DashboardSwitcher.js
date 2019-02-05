import React from "react";
import { Switch, Route } from "react-router-dom";
import EmployeeList from "../components/content/employee/employeeList";
import CreateEmployee from "./content/employee/createEmployee";
import UpdateEmployee from "../components/content/employee/updateEmployee";

const DashboardSwitcher = () => {
  return (
    <main role="main">
      <Switch>
        <Route path="/employees" component={EmployeeList} />
        <Route path="/add-employee" component={CreateEmployee} />
        <Route path="/edit-employee" component={UpdateEmployee} />
      </Switch>
    </main>
  );
};
export default DashboardSwitcher;
