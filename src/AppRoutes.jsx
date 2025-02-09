import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router';
import DriversPage from "./pages/DriversPage";
import Teams from "./pages/Teams";
import Race from "./pages/Race";

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DriversPage/>
    }, 
    {
        path: '/DriversPage',
        element: <DriversPage/>
    }, 
    {
        path: '/Teams',
        element: <Teams/>
    }, 
    {
        path: '/Race',
        element: <Race/>
    }, 
]);

const AppRoutes = () => {
    return <RouterProvider router={router}/>
};

export default AppRoutes;