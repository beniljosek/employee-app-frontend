import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import FormInput from "../../components/form-input/formInput";
import Dropdown from "../../components/dropdown/dropdown";
import Button from "../../components/button/button";
import { useCreateEmployeeMutation, useGetEmployeeQuery, useUpdateEmployeeMutation } from "../../rtk/api";

import './styles.scss';

const CreateEditEmployee = ({ mode }) => {
    const navigate = useNavigate();
    const { id } = useParams();

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
        pincode: "",
        id: ''
    }

    const [employee, setEmployee] = useState(defaultEmployeeState);

    const { data = {}, isSuccess } = useGetEmployeeQuery(id);
    const [createEmployee, result] = useCreateEmployeeMutation();
    const [updateEmployee] = useUpdateEmployeeMutation();

    const roleOptions = ["DEVELOPER", "UI", "UX", "HR"];
    const statusOptions = ["ACTIVE", "INACTIVE"];

    const fieldList = [
        { label: "Employee Name", key: "name", type: "text", value: employee.name },
        { label: "Email", key: "email", type: "text", value: employee.email },
        { label: "Password", key: "password", type: "password", disabled: mode === "edit",  value: employee.password },
        { label: "Joining Date", key: "createdAt", type: "text",disabled: true,  value: employee.createdAt },
        { label: "Role", key: "role", options: roleOptions, value: employee.role },
        { label: "Address", key: "address", type: "text", value: employee.address?.line1 },
        { label: "Pincode", key: "pincode", type: "number", value: employee.address?.pincode },
        { label: "Employee ID", key: "id", type: "text", disabled: true, value: id },
    ];

    useEffect(() => {
        if (mode === "edit") {
            if (data) {
                setEmployee({
                    name: data.name,
                    email: data.email,
                    password: "",
                    experience: data.experience,
                    date: data.createdAt,
                    role: data.role,
                    address: data.address?.line1,
                    pincode: data.address?.pincode,
                    id: data.id
                })
            }
        }
    }, [id, data, isSuccess]);

    useEffect(() => {
        if (result.isSuccess) {
            navigate('/repository');
        } else if (result.isError) {
            console.log(result.isError);
        }
    }, [result]);

    const onChangeInput = (key, value) => {
        setEmployee((current) => ({ ...current, [key]: value }))
    }

    const onSelectInput = (key, value) => {
        setEmployee((current) => ({ ...current, [key]: value }))
    }

    const getInputValue = (key, value) => {
        console.log(key, value);
        if (key === 'createdAt') {
            const date = new Date(value);
            // console.log(value, date.toLocaleString());
            // return date.toLocaleString().toString() || "";
            return value || "";
        }
        return value || "";
    }
    console.log(employee);

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

    const onUpdateClick = () => {
        updateEmployee(employee);
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
                    {fieldList.map(({ label, key, type, options, disabled, value }) => {
                        return type ? (
                            <FormInput
                                disabled={disabled}
                                label={label}
                                onChange={(value) => onChangeInput(key, value)}
                                placeHolder={label}
                                type={type}
                                value={getInputValue(key, value)}
                                key={key}
                            />
                        ) : (
                            <Dropdown
                                label={label}
                                onChange={(value) => onSelectInput(key, value)}
                                placeHolder={label}
                                options={options}
                                value={value}
                                key={key}
                            />
                        )
                    })}
                </div>
                <div className="buttonsContainer">
                    <Button handleClick={mode === "create" ? onCreateClick : onUpdateClick} label={mode === "create" ? "Create" : "Save"} />
                    <Button handleClick={onCancelClick} label="Cancel" variant="secondary" />
                </div>
            </div>
        </div>
    );
}

export default CreateEditEmployee;
