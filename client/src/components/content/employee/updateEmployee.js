import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getEmployeeByID,
  updateEmployee,
  deleteEmployee
} from "../../../actions/employeeAction";
import { Link } from "react-router-dom";

class UpdateEmployee extends React.Component {
  constructor(props) {
    super(props);
    let epmloyeeData = JSON.parse(localStorage.getItem("EMPLOYEE-DATA"));
    this.employeeID = epmloyeeData.id;
    this.state = {
      formdata: {
        id: "",
        name: "",
        department: ""
      },
      currentID: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.props.getEmployeeByID(this.employeeID);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      formdata: newProps.employeeReducer.employeeByIDReducer[0],
      currentID: newProps.employeeReducer.employeeByIDReducer[0].id
    });
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp
    });
  }

  submitHandler() {
    const formdata = {
      _id: this.state.formdata._id,
      currentID: this.state.currentID,
      id: this.state.formdata.id,
      name: this.state.formdata.name,
      department: this.state.formdata.department
    };
    this.props.updateEmployee(formdata);
    setTimeout(() => {
      window.location.href = "/employees";
    }, 1000);
  }

  deleteHandler() {
    const formdata = {
      currentID: this.state.formdata._id
    };
    this.props.deleteEmployee(formdata);
    setTimeout(() => {
      window.location.href = "/employees";
    }, 1000);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h2 className="mt-2">Edit Employee</h2>
            <Link to={`/employees`}>Back</Link>
            <div className="form-col">
              <label>Employee ID</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Auto Generate"
                  name="id"
                  value={this.state.formdata.id}
                  onChange={this.changeHandler}
                  disabled
                />
              </div>
              <label className="mt-2">Employee Name</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee Name"
                  name="name"
                  value={this.state.formdata.name}
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
                  value={this.state.formdata.department}
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
                <button className="btn btn-danger" onClick={this.deleteHandler}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  employeeReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employeeReducer: state.employeeIndexReducer
});

export default connect(
  mapStateToProps,
  { getEmployeeByID, updateEmployee, deleteEmployee }
)(UpdateEmployee);
