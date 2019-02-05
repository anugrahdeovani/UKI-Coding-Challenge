const employeeLogic = require("../bisnislogics/Employee_Logic");

// Made By: Deovani Anugrah
module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});
  // Eployees Route
  server.get("/api/employees", employeeLogic.readAllEmployee);
  server.post("/api/employees", employeeLogic.createEmployee);
  server.get("/api/employees/:id", employeeLogic.readEmployeeByID);
  server.put("/api/employees/:id", employeeLogic.updateEmployee);
  server.del("/api/employees/:id", employeeLogic.deleteEmployee);
  //== End of Eployees Route
};
