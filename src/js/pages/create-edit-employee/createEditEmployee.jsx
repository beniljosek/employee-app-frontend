import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import FormInput from "../../components/form-input/formInput";
import Dropdown from "../../components/dropdown/dropdown";
import Button from "../../components/button/button";
import { useCreateEmployeeMutation, useGetEmployeeQuery } from "../../rtk/api";

import './styles.scss';

const CreateEditEmployee = ({ id, mode }) => {
    console.log('mode', mode);
    const navigate = useNavigate();

    const defaultEmployeeState = {
        name: "",
        email: "",
        password: "",
        experience: "",
        // department: "",
        // date: "",
        role: "",
        // status: "",
        address: "",
        pincode: ""
    }

    const [employee, setEmployee] = useState(defaultEmployeeState);

    const { data = {}, isSuccess } = useGetEmployeeQuery(1);
    const [createEmployee, result] = useCreateEmployeeMutation();

    const roleOptions = ["DEVELOPER", "UI", "UX", "HR"];
    const statusOptions = ["ACTIVE", "INACTIVE"];

    const fieldList = [
        { label: "Employee Name", key: "name", type: "text" },
        { label: "Email", key: "email", type: "text" },
        { label: "Experience (Yrs)", key: "experience", type: "number" },
        { label: "Password", key: "password", type: "password" },
        // { label: "Department", key: "department", type: "text" },
        // { label: "Joining Date", key: "date", type: "text" },
        { label: "Role", key: "role", options: roleOptions },
        // { label: "Status", key: "status", options: statusOptions },
        { label: "Address", key: "address", type: "text" },
        { label: "Pincode", key: "pincode", type: "number" },
        { label: "Employee ID", key: "empId", type: "text", disabled: true },
    ];

    useEffect(() => {
        if (mode === "edit") {
            console.log(id, data);
        }
    }, [id, data, isSuccess]);

    useEffect(() => {
        console.log(result.isSuccess);
        if (result.isSuccess) {
            navigate('/repository');
        } else if (result.isError) {
            console.log(result.isError);
        }
    }, [result]);

    const onChangeInput = (key, value) => {
        setEmployee((current) => ({ ...current, [key]: value }))
    }

    const onSelectInput = (key, value)  => {
        setEmployee((current) => ({ ...current, [key]: value }))
    }

    const onCreateClick = () => {
        createEmployee({
            name: employee.name,
            email: employee.email,
            password: employee.password,
            role: employee.role,
            status: employee.status,
            experience: Number(employee.experience),
            address: { line1: employee.address, pincode: employee.pincode },
            department: employee.department,
        });
    }

    const onCancelClick = () => {
        setEmployee(defaultEmployeeState);
        navigate(`/repository`);
    }

    return (
        <div className="createEmployeeContainer">
            <div className="header">
                <span className="title">Create Employee</span>
            </div>
            <div className="formContainer">
                <div className="formSection">
                    {fieldList.map(({ label, key, type, options, disabled }) => {
                        return type ? (
                            <FormInput
                                disabled={disabled}
                                label={label}
                                onChange={(value) => onChangeInput(key, value)}
                                placeHolder={label}
                                type={type}
                                key={key}
                            />
                        ) : (
                            <Dropdown
                                label={label}
                                onChange={(value) => onSelectInput(key, value)}
                                placeHolder={label}
                                options={options}
                                key={key}
                            />
                        )
                    })}
                </div>
                <div className="buttonsContainer">
                    <Button handleClick={onCreateClick} label="Create" />
                    <Button handleClick={onCancelClick} label="Cancel" />
                </div>
            </div>
        </div>
    );
}

export default CreateEditEmployee;
