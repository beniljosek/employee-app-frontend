import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import FormInput from "../../components/form-input/formInput";
import Dropdown from "../../components/dropdown/dropdown";
import Button from "../../components/button/button";
import { useCreateEmployeeMutation, useGetEmployeeQuery } from "../../rtk/api";

import './styles.scss';

const CreateEditEmployee = ({ id, mode }) => {
    const navigate = useNavigate();

    const defaultEmployeeState = {
        name: "",
        department: "",
        date: "",
        role: "",
        status: "",
        experience: "",
        address: "",
    }

    const [employee, setEmployee] = useState(defaultEmployeeState);

    const { data = {}, isSuccess } = useGetEmployeeQuery(1);
    const [createEmployee, result] = useCreateEmployeeMutation();

    const roleOptions = ["DEVELOPER", "UI", "UX", "HR"];
    const statusOptions = ["ACTIVE", "INACTIVE"];

    const fieldList = [
        { label: "Employee Name", key: "name", type: "text" },
        { label: "Joining Date", key: "date", type: "text" },
        { label: "Experience (Yrs)", key: "experience", type: "number" },
        { label: "Department", key: "department", type: "text" },
        { label: "Role", key: "role", options: roleOptions },
        { label: "Status", key: "status", options: statusOptions },
        { label: "Address", key: "address", type: "text" },
        { label: "Employee ID", key: "empId", type: "text" },
    ];


    // useEffect(() => {
    //     console.log(data);
    // }, [id, data, isSuccess]);

    const onChangeInput = (key, value) => {
        setEmployee((current) => ({ ...current, [key]: value }))
    }

    const onCreateClick = () => {
        createEmployee({
            name: employee.name,
            email: employee.email,
            password: employee.password,
            role: mapRoleFrontendToBackend(employee.role),
            status: mapStatusFrontendToBackend(employee.status),
            experience: Number(employee.experience),
            address: { line1: employee.line1, pincode: employee.pincode },
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
                    {fieldList.map(({ label, key, type, options }) => {
                        return type ? (
                            <FormInput
                                label={label}
                                onChange={(value) => onChangeInput(key, value)}
                                placeHolder={label}
                                type={type}
                                key={key}
                            />
                        ) : (
                            <Dropdown
                                label={label}
                                onChange={(value) => onChangeInput(key, value)}
                                placeHolder={label}
                                options={options}
                                key={key}
                            />
                        )
                    })}
                </div>
                <div className="buttonsContainer">
                    <Button handleClick={createEmployee} label="Create" />
                    <Button handleClick={onCancelClick} label="Cancel" />
                </div>
            </div>
        </div>
    );
}

export default CreateEditEmployee;
