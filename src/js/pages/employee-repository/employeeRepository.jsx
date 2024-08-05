import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from "../../components/button/button";
import { useGetEmployeesQuery } from '../../rtk/api';

import './styles.scss';

const EmployeeRepository = () => {
    const navigate = useNavigate();

    const { data = [], error, isLoading, refetch } = useGetEmployeesQuery();

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

    const onEmployeeNameClick = (id) => navigate(`/employee/${id}`);

    return (
        <div className="emplyeeListContainer">
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
                                    <td onClick={() => onEmployeeNameClick(employee.id)}>{employee.name}</td>
                                    <td>{employee.id}</td>
                                    <td>{employee.joiningdate}</td>
                                    <td>{employee.role}</td>
                                    <td >
                                        <span className={employee.status}>{employee.status}</span>
                                    </td>
                                    <td>{employee.experience}</td>
                                    <td >
                                        <Button label="Delete" handleClick={() => {}} />
                                        <Button label="Update" handleClick={() => {}} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="tableHeader"></div>
                    <div className="listWrapper"></div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeRepository;
