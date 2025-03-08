import { LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return initialState;
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
