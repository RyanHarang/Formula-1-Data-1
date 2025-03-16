const authReducer = require("../src/store/authReducer");
const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} = require("../src/store/actionTypes");

describe("authReducer Tests", () => {
  const initialState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    error: null,
  };

  it("should return the initial state when no action is provided", () => {
    const state = authReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("should handle LOGIN_SUCCESS", () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: {
        token: "mockToken",
        user: { id: 1, email: "test@example.com" },
      },
    };

    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload.token,
      error: null,
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle LOGIN_FAILURE", () => {
    const action = {
      type: LOGIN_FAILURE,
      payload: "Invalid credentials",
    };

    const expectedState = {
      ...initialState,
      isAuthenticated: false,
      user: null,
      token: null,
      error: action.payload,
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle LOGOUT", () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { id: 1, email: "test@example.com" },
      token: "mockToken",
      error: null,
    };

    const action = { type: LOGOUT };

    const state = authReducer(loggedInState, action);
    expect(state).toEqual(initialState);
  });

  it("should handle REGISTER_SUCCESS", () => {
    const action = { type: REGISTER_SUCCESS };

    const expectedState = {
      ...initialState,
      error: null,
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle REGISTER_FAILURE", () => {
    const action = {
      type: REGISTER_FAILURE,
      payload: "Email already exists",
    };

    const expectedState = {
      ...initialState,
      error: action.payload,
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});