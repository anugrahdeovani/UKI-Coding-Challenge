import axios from "axios";
import Apiconfig from "../configs/api.config.json";

export const getEmployee = () => dispatch => {
  let options = {
    url: Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.EMPLOYEE,
    method: "get"
  };
  axios(options)
    .then(res => {
      dispatch({
        type: "GET_EMPLOYEE",
        payload: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: "GET_EMPLOYEE",
        payload: null
      });
    });
};

export const getEmployeeByID = employeeID => dispatch => {
  let options = {
    url: Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.EMPLOYEE + "/" + employeeID,
    method: "get"
  };
  axios(options)
    .then(res => {
      dispatch({
        type: "GET_EMPLOYEE_BY_ID",
        payload: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: "GET_EMPLOYEE_BY_ID",
        payload: null
      });
    });
};

export const createEmployee = newEployeeData => dispatch => {
  let option = {
    url: Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.EMPLOYEE,
    method: "post",
    data: newEployeeData
  };
  axios(option)
    .then(res => {
      dispatch({
        type: "CREATE_EMPLOYEE",
        payload: newEployeeData,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: "CREATE_EMPLOYEE",
        payload: null
      });
    });
};

export const updateEmployee = updatedEmployeeData => dispatch => {
  let options = {
    url:
      Apiconfig.BASE_URL +
      Apiconfig.ENDPOINTS.EMPLOYEE +
      "/" +
      updatedEmployeeData.currentID,
    method: "put",
    data: updatedEmployeeData
  };
  axios(options)
    .then(res => {
      dispatch({
        type: "UPDATE_EMPLOYEE",
        payload: updatedEmployeeData,
        status: res.data.id
      });
    })
    .catch(error => {
      dispatch({
        type: "UPDATE_EMPLOYEE",
        payload: null
      });
    });
};

export const deleteEmployee = deletedEmployeeData => dispatch => {
  let options = {
    url:
      Apiconfig.BASE_URL +
      Apiconfig.ENDPOINTS.EMPLOYEE +
      "/" +
      deletedEmployeeData.currentID,
    method: "delete"
  };
  axios(options)
    .then(res => {
      dispatch({
        type: "DELETE_EMPLOYEE",
        payload: res.data.message,
        status: res.data.status
      });
    })
    .catch(error => {
      dispatch({
        type: "DELETE_EMPLOYEE",
        payload: null
      });
    });
};
