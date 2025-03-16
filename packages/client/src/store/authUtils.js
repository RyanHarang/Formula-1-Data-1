import { jwtDecode } from "jwt-decode";
import store from "./store";
import { logout } from "./authActions";

export const setLogoutTimer = (token) => {
  if (!token) return;

  try {
    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = decoded.exp - currentTime;

    if (timeUntilExpiry <= 0) {
      store.dispatch(logout());
    } else {
      setTimeout(() => {
        store.dispatch(logout());
      }, timeUntilExpiry * 1000);
    }
  } catch (error) {
    console.error("Invalid token:", error);
    store.dispatch(logout());
  }
};
