import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";
import { setLogoutTimer } from "./authUtils";

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
    return Promise.resolve();
  };
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    setLogoutTimer(data.token);
    return Promise.resolve();
  } catch (error) {
    console.error("Login error:", error.message);

    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    dispatch({ type: REGISTER_SUCCESS });
    await dispatch(login(email, password));
    return Promise.resolve();
  } catch (error) {
    console.error("Register error:", error.message);

    dispatch({
      type: REGISTER_FAILURE,
      payload: error.message,
    });
  }
};
