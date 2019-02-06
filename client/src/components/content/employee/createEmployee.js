import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createEmployee } from "../../../actions/employeeAction";
import { Link } from "react-router-dom";

class CreateEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      department: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  submitHandler() {
    const formdata = {
      id: this.state.id,
      name: this.state.name,
      department: this.state.department
    };
    this.props.createEmployee(formdata, this.props.history);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h2 className="mt-2">Add Employee</h2>
            <Link to={`/employees`}>Back</Link>
            <div className="form-col">
              <label>Employee ID</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Auto Generate"
                  name="id"
                  value={this.state.id}
                  onChange={this.changeHandler}
                />
              </div>
              <label className="mt-2">Employee Name</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.changeHandler}
                />
              </div>
              <label className="mt-2">Employee Department</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee Department"
                  name="department"
                  value={this.state.department}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mt-2">
                <button
                  className="mr-3 btn btn-primary"
                  onClick={this.submitHandler}
                >
                  Save
                </button>
                <Link to="employees">
                  <button className="btn btn-warning">Cancel</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
  createEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employeeReducer: state.employeeIndexReducer
});

export default connect(
  mapStateToProps,
  { createEmployee }
)(CreateEmployee);
