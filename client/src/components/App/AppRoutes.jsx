import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import DriversPage from "../pages/DriversPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";
import RacesPage from "../pages/RacesPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DriversPage />,
  },
  {
    path: "/DriversPage",
    element: <DriversPage />,
  },
  {
    path: "/Teams",
    element: <TeamsPage />,
  },
  {
    path: "/Race",
    element: <RacesPage />,
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Signup",
    element: <SignupPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
