import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import FormInput from "../../components/form-input/formInput";
import Button from "../../components/button/button";
import { useLoginMutation } from "./api";

import './styles.scss';

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const [login, result] = useLoginMutation();

    useEffect(() => {
        if (result.isSuccess && result.data.data.token) {
            localStorage.setItem("token", result.data.data.token);
            navigate("/repository");
        }
    }, [result]);

    const onChangeInput = (key, value) => {
        setCredentials((current) => ({ ...current, [key]: value }))
    }

    const onLoginClick = async () => {
        const output = await login(credentials);
    }


    return (
        <div className="loginContainer">
            <div className="leftSection"></div>
            <div className="rightSection">
                <div className="loginForm">
                    <img className="kvIcon" src="/icons/kv-logo.png" alt="logo" />
                    <FormInput type="text" id="username" label="Username" placeHolder="Enter Username" onChange={(value) => onChangeInput("email", value)} />
                    <FormInput type="password" id="password" label="Password" placeHolder="Enter Password" onChange={(value) => onChangeInput("password", value)} />
                    <Button label="Login" handleClick={onLoginClick} />
                </div>
            </div>
        </div>
    );
}

export default Login;