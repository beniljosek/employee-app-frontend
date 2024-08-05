import React from "react";

import './styles.scss';

const EmployeeDetails = () => {
    return (
        <div className="employeeDetailsContainer">
            <div className="header">
                <span className="title">Employee Details</span>
                <div className="createButton" role="presentation" onClick={() => console.log('create')}>
                    <div className="createCircle">+</div>
                    <span className="createText">Edit</span>
                </div>
            </div>
            <div className="detailsContainer">
                <div className="row"></div>
                <div className="row"></div>
            </div>
        </div>
    );
}

export default EmployeeDetails;
