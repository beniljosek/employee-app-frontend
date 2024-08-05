import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Button from "../../components/button/button";
import DeleteEmployeeDialog from "../../components/delete-employee-dialog/deleteEmployeeDialog";
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from '../../rtk/api';

import './styles.scss';

const EmployeeRepository = () => {
    const navigate = useNavigate();

    const defaultDialogData = { id: '', isOpen: false };
    const [deleteDialogData, setDeleteDialogData] = useState(defaultDialogData);

    const { data = [], error, isLoading, refetch } = useGetEmployeesQuery();
    const [deleteEmployee] = useDeleteEmployeeMutation();

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

    const onDeleteEmployeeConfirm = () => {
        deleteEmployee(deleteDialogData.id);
        setDeleteDialogData(defaultDialogData);
    };


    return (
        <div className="employeeListContainer">
            <div className="leftSidebar">
                <img src="./src/js/icons/kv-logo.png" alt="logo" />
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
                                    <td>{employee.joiningdate}</td>
                                    <td>{employee.role}</td>
                                    <td >
                                        <span className={employee.status}>{employee.status}</span>
                                    </td>
                                    <td>{employee.experience}</td>
                                    <td >
                                        <Button label="Delete" handleClick={() => setDeleteDialogData({ id: employee.id, isOpen: true })} />
                                        <Button label="Update" handleClick={() => navigate(`/edit/${employee.id}`)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="tableHeader"></div>
                    <div className="listWrapper"></div>
                </div>
            </div>
            {deleteDialogData.isOpen && (
                <DeleteEmployeeDialog
                    isOpen={deleteDialogData.isOpen}
                    onClose={() => setDeleteDialogData(defaultDialogData)}
                    onConfirm={onDeleteEmployeeConfirm}
                />
            )}
        </div>
    );
};

export default EmployeeRepository;
