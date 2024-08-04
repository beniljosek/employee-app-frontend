import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import FormInput from "../../components/form-input/formInput";
import Dropdown from "../../components/dropdown/dropdown";
import Button from "../../components/button/button";
import { useCreateEmployeeMutation, useGetEmployeeQuery } from "../../rtk/api";

import './styles.scss';

const CreateEditEmployee = ({ id }) => {
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

    // useEffect(() => {
    //     console.log(data);
    //     if (isSuccess) {
    //         setEmployee({
    //             ...data,
    //             name: data.name,
    //             email: data.email,
    //             role: mapRoleBackendToFrontend(data.role),
    //             status: mapStatusBackendToFrontend(data.status),
    //             experience: Number(data.experience),
    //             line1: data?.address?.line1,
    //             pincode: data?.address?.pincode,
    //             department: data?.department?.name,
    //         });
    //     }
    //     console.log(employee);
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
                    <FormInput label="Employee Name" onChange={(value) => onChangeInput('name', value)} placeHolder="Employee Name" type="text" key="name" />
                    <FormInput label="Joining Date" onChange={(value) => onChangeInput('date', value)} placeHolder="Joining Date" type="text" key="date" />
                    <FormInput label="Experience (Yrs)" onChange={(value) => onChangeInput('experience', value)} placeHolder="Experience" type="number" key="experience" />
                    <FormInput label="Department" onChange={(value) => onChangeInput('department', value)} placeHolder="Department" type="text" key="department" />
                    <Dropdown label="Role" onChange={(value) => onChangeInput('role', value)} placeHolder="Role" options={roleOptions} key="role" />
                    <Dropdown label="Status" onChange={(value) => onChangeInput('status', value)} placeHolder="Status" options={statusOptions} key="status" />
                    <FormInput label="Address" onChange={(value) => onChangeInput('address', value)} placeHolder="Address" type="text" key="address" />
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
