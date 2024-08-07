import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { setDeleteDialogData, resetDeleteDialogData } from "../../store/slice/deleteDialogSlice";
import DeleteEmployeeDialog from "../../components/delete-employee-dialog/deleteEmployeeDialog";
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "./api";

import './styles.scss';

const EmployeeRepository = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteDialogData = useSelector((state) => state.deleteDialogData.value);

    const { data = [], refetch } = useGetEmployeesQuery();
    const [deleteEmployee] = useDeleteEmployeeMutation();

    const defaultDialogData = { id: '', isOpen: false };

    const tableColumns = [
        "Employee Name",
        "Employee ID",
        "Joining Date",
        "Role",
        "Status",
        "Experience",
        "Action"
    ];

    useEffect(() => {
        refetch();
    }, []);

    const onCreateEmployeeClick = () => navigate(`/create`);

    const getDateValue = (value) => {
        const date = new Date(value);
        return date.toLocaleString()
    }

    const onDeleteEmployeeConfirm = () => {
        deleteEmployee(deleteDialogData.id);
        dispatch(setDeleteDialogData(defaultDialogData));
    };


    return (
        <div className="employeeListContainer">
            <div className="leftSidebar">
                <img className="kvIcon" src="icons/kv-logo.png" alt="logo" />
                <div className="tab">Employee List</div>
            </div>
            <div className="rightSection">
                <div className="header">
                    <span className="title">Employee List</span>
                    <div className="createButton" role="presentation" onClick={onCreateEmployeeClick}>
                        <div className="createCircle">+</div>
                        <span className="createText">Create employee</span>
                    </div>
                </div>
                <div className="employeeTable">
                    <table>
                        <thead>
                            <tr>
                                {tableColumns.map((column) => (
                                    <th key={column}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((employee) => (
                                <tr key={employee.id} >
                                    <td className="name" onClick={() => navigate(`/employee/${employee.id}`)}>{employee.name}</td>
                                    <td>{employee.id}</td>
                                    <td>{getDateValue(employee.createdAt)}</td>
                                    <td>{employee.role}</td>
                                    <td className={employee.status}>{employee.status}</td>
                                    <td>{employee.experience}</td>
                                    <td>
                                        <div className="actionButtons">
                                            <img
                                                src="icons/trash.svg"
                                                title="Delete"
                                                onClick={() => dispatch(setDeleteDialogData({ id: employee.id, isOpen: true }))}
                                                alt="delete-employee"
                                            />
                                            <img
                                                src="icons/edit.svg"
                                                title="Edit"
                                                onClick={() => navigate(`/edit/${employee.id}`)}
                                                alt="edit-employee"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {deleteDialogData.isOpen && (
                <DeleteEmployeeDialog
                    isOpen={deleteDialogData.isOpen}
                    onClose={() => dispatch(setDeleteDialogData(defaultDialogData))}
                    onConfirm={onDeleteEmployeeConfirm}
                />
            )}
        </div>
    );
};

export default EmployeeRepository;
