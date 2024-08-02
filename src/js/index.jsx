import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import Login from "./pages/login/login";
import EmployeeList from "./pages/employee-list/employeeList";

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<EmployeeList />} path="/list" />
        </Routes>
    </BrowserRouter>
);