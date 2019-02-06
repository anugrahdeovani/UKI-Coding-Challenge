import React from "react";
import { Link } from "react-router-dom";
import { getEmployee } from "../../../actions/employeeAction";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  IconButton,
  Paper,
  Hidden,
  Grid
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

class ListEmployee extends React.Component {
  componentDidMount() {
    this.props.getEmployee();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      result: newProps.employeeReducer.employeeReducer,
      employees: newProps.employeeReducer.employeeReducer
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      result: [],
      employees: [],
      page: 0,
      rowsPerPage: 5,
      alertData: {
        status: 0,
        message: "",
        code: ""
      }
    };
    this.editHandler = this.editHandler.bind(this);
  }

  editHandler(employeeData) {
    localStorage.setItem("EMPLOYEE-DATA", JSON.stringify(employeeData));
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <h2 className="mt-2 mb-3">Employee List</h2>
            </Grid>
            <Link to={`/employees/add-employee`}>
              <button className="mb-3 btn btn-primary">+New Employee</button>
            </Link>
            <Grid item xs={12}>
              <Hidden>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Employee ID</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.employees
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((employee, index) => {
                          return (
                            <TableRow key={employee._id}>
                              <TableCell component="th" scope="row">
                                {employee.id}
                              </TableCell>
                              <TableCell>{employee.name}</TableCell>
                              <TableCell>{employee.department}</TableCell>
                              <TableCell>
                                <Link
                                  to={`/employees/${employee.id}`}
                                  onClick={this.editHandler}
                                >
                                  [Edit]
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          colSpan={3}
                          count={this.state.employees.length}
                          rowsPerPage={this.state.rowsPerPage}
                          page={this.state.page}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActionsWrapped}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </Paper>
              </Hidden>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

ListEmployee.propTypes = {
  getEmployee: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employeeReducer: state.employeeIndexReducer
});

export default connect(
  mapStateToProps,
  { getEmployee }
)(ListEmployee);
