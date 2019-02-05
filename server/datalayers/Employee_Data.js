const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectId;

const db = DB.getConnection();
const dtl = {
  readAllEmployees: callback => {
    db.collection("employee")
      .find()
      .sort({ id: 1 })
      .toArray((err, docs) => {
        if (err) {
          callback(err);
        } else {
          callback(docs);
        }
      });
  },

  readEmployeeByID: (callback, employeeID) => {
    db.collection("employee")
      .find({ id: employeeID })
      .toArray((err, docs) => {
        if (err) {
          callback(err);
        } else {
          callback(docs);
        }
      });
  },

  createEmployee: (callback, employeeData) => {
    db.collection("employee").insertOne(employeeData, (err, docs) => {
      if (err) {
        callback(err);
      } else {
        callback(docs);
      }
    });
  },

  updateEmployee: (callback, id, data) => {
    db.collection("employee").updateOne(
      { id: id },
      { $set: data },
      (err, docs) => {
        if (err) {
          callback(err);
        } else {
          callback(docs);
        }
      }
    );
  },

  deleteEmployee: (callback, id) => {
    db.collection("employee").deleteOne({ id: id }),
      (err, docs) => {
        if (err) {
          callback(err);
        } else {
          callback(docs);
        }
      };
  }
};

module.exports = dtl;
