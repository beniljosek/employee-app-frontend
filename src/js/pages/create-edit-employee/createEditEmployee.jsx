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
        { label: "Experience (Yrs)", key: "experience", type: "number", value: employee.experience },
        { label: "Password", key: "password", type: "password", value: "" },
        // { label: "Department", key: "department", type: "text" },
        // { label: "Joining Date", key: "date", type: "text" },
        { label: "Role", key: "role", options: roleOptions, value: employee.role },
        // { label: "Status", key: "status", options: statusOptions },
        { label: "Address", key: "address", type: "text", value: employee.address?.line1 },
        { label: "Pincode", key: "pincode", type: "number", value: employee.address?.pincode },
        { label: "Employee ID", key: "id", type: "text", disabled: true, value: id },
    ];

    useEffect(() => {
        if (mode === "edit") {
            if (data) {
                // console.log(data);
                setEmployee({
                    name: data.name,
                    email: data.email,
                    password: "",
                    experience: data.experience,
                    // department: "",
                    // date: "",
                    role: data.role,
                    // status: "",
                    address: data.address?.line1,
                    pincode: data.address?.pincode,
                    id: data.id
                })
            }
        }
    }, [id, data, isSuccess]);
    // console.log(employee);

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
                                value={value}
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
                    <Button handleClick={onCancelClick} label="Cancel" />
                </div>
            </div>
        </div>
    );
}

export default CreateEditEmployee;
