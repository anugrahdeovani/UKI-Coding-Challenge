const initialState = {
  employeeReducer: [],
  employeeByIDReducer: [],
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_EMPLOYEE":
      return {
        ...state,
        employeeReducer: action.payload
      };
    case "GET_EMPLOYEE_BY_ID":
      return {
        ...state,
        employeeByIDReducer: action.payload
      };
    case "CREATE_EMPLOYEE":
      return {
        ...state,
        statusADD: action.status
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        statusPUT: action.status
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        statusDEL: action.status
      };
    default:
      return state;
  }
}
