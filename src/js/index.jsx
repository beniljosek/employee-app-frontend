import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";

import Login from "./pages/login/login";
import EmployeeRepository from "./pages/employee-repository/employeeRepository";
import EmployeeDetails from "./pages/employee-details/employeeDetails";
import { store } from "./store/store";
import CreateEditEmployee from "./pages/create-edit-employee/createEditEmployee";

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="/" />
                <Route element={<EmployeeRepository />} path="/repository" />
                <Route element={<EmployeeDetails />} path="/employee/:id" />
                <Route element={<CreateEditEmployee mode="create" />} path="/create" />
                <Route element={<CreateEditEmployee mode="edit" />} path="/edit/:id" />
            </Routes>
        </BrowserRouter>
    </Provider>
);