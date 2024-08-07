import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetEmployeeQuery } from "../employee-repository/api";

import './styles.scss';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data = {}, isSuccess } = useGetEmployeeQuery(id)

    const detailsList = [
        { label: "Employee Name", key: "name" },
        { label: "Joining Date", key: "createdAt" },
        { label: "Role", key: "role" },
        { label: "Email", key: "email" },
        { label: "Address", key: "line1" },
        { label: "Pincode", key: "pincode" },
        { label: "Employee ID", key: "id" }
    ];

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [isSuccess]);

    const getValue = (key) => {
        if (key === "createdAt") {
            const date = new Date(data[key]);
            return date.toLocaleString()
        } else if (key === "line1") {
            return data.address?.line1;
        } else if (key === "pincode") {
            return data.address?.pincode
        }
        return data[key];
    }

    return (
        <div className="employeeDetailsContainer">
            <div className="header">
                <span className="title">Employee Details</span>
                <div className="createButton" role="presentation" onClick={() => navigate(`/edit/${id}`)}>
                    <div className="createCircle">+</div>
                    <span className="createText">Edit</span>
                </div>
            </div>
            <div className="detailsContainer">
                {detailsList.map(({ label, key }) => (
                    <div className="detailCard" key={key}>
                        <span className="label">{label}</span>
                        <span>{getValue(key)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeDetails;
