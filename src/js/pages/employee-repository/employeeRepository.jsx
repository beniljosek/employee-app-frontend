import React from "react";
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const EmployeeRepository = () => {
    const navigate = useNavigate();

    const tableColumns = [
        "Employee Name",
        "Employee ID",
        "Joining Date",
        "Role",
        "Status",
        "Experience",
        "Action"
    ];

    const data = [];

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
                    <div className="createButton" role="presentation" onClick={() => console.log('create')}>
                        <div className="createCircle">+</div>
                        <span className="createText">Create employee</span>
                    </div>
                </div>
                <div className="employeeTable">
                    <table>
                        <thead>
                            <tr>
                                {tableColumns.map((column) => (
                                    <th>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((employee) => (
                                <tr >
                                    <td onClick={() => onEmployeeNameClick(employee.id)}>{employee.name}</td>
                                    <td>{employee.id}</td>
                                    <td>{employee.joiningdate}</td>
                                    <td>{employee.role}</td>
                                    <td >
                                        <span className={employee.status}>{employee.status}</span>
                                    </td>
                                    <td>{employee.experience}</td>
                                    <td >
                                        <Button label="Delete" className="create1" handleClick={() => { DeleteEmployee(employee.id) }} />
                                        <Button label="Update" className="update" handleClick={() => { goToNextPage(`/${employee.id}/editpage`) }} />
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
