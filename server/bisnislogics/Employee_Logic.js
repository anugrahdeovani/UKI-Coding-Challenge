const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/Employee_Data");

const Employee_Logic = {
  readAllEmployee: (req, res, next) => {
    dtl.readAllEmployees(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },

  readEmployeeByID: (req, res, next) => {
    const employeeID = req.params.id;
    dtl.readEmployeeByID(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    }, employeeID);
  },

  createEmployee: (req, res, next) => {
    const employeeData = {
      id: req.body.id,
      name: req.body.name,
      department: req.body.department
    };
    dtl.createEmployee(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    }, employeeData);
  },

  updateEmployee: (req, res, next) => {
    const id = req.params.id;
    const data = {
      id: req.body.id,
      name: req.body.name,
      department: req.body.department
    };
    dtl.updateEmployee(
      function(items) {
        ResponseHelper.sendResponse(res, 200, items);
      },
      id,
      data
    );
  },

  deleteEmployee: (req, res, next) => {
    const employeeID = req.params.id;
    dtl.deleteEmployee(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    }, employeeID);
  }
};

module.exports = Employee_Logic;
