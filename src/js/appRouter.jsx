import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/login/login";
import EmployeeRepository from "./pages/employee-repository/employeeRepository";
import EmployeeDetails from "./pages/employee-details/employeeDetails";
import CreateEditEmployee from "./pages/create-edit-employee/createEditEmployee";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/repository",
        element: <EmployeeRepository />
    },
    {
        path: "/employee/:id",
        element: <EmployeeDetails />
    },
    {
        path: "/create",
        element: <CreateEditEmployee mode="create" />
    },
    {
        path: "/edit/:id",
        element: <CreateEditEmployee mode="edit" />
    },
], { basename: "/" });


const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;
