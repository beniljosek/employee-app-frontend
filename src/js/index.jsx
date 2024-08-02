import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import Login from "./pages/login/login";
import EmployeeRepository from "./pages/employee-repository/employeeRepository";
import EmployeeDetails from "./pages/employee-details/employeeDetails";

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<EmployeeRepository />} path="/repository" />
            {/* <Route element={<EmployeeDetails />} path="/" /> */}
        </Routes>
    </BrowserRouter>
);