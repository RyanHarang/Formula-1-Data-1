import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setLogoutTimer } from "./store/authUtils.js";
import store from "./store/store.js";
import "./index.css";
import App from "./components/App/App.jsx";

const token = localStorage.getItem("token");
if (token) {
  setLogoutTimer(token);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
