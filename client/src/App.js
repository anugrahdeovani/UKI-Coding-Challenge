import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import EmployeeList from "./components/content/employee/employeeList";
import CreateEmployee from "./components/content/employee/createEmployee";
import UpdateEmployee from "./components/content/employee/updateEmployee";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={EmployeeList} />
          <Route exact path="/employees" component={EmployeeList} />
          <Route
            exact
            path="/employees/add-employee"
            component={CreateEmployee}
          />
          <Route exact path="/employees/:code" component={UpdateEmployee} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
