import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import FormInput from "../../components/form-input/formInput";
import Button from "../../components/button/button";

import './styles.scss';

const Login = () => {
    const navigate = useNavigate();
    
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const onChangeInput = (key, value) => {
        console.log(key, value)
        setCredentials((current) => ({ ...current, [key]: value }))
    }

    const onLoginClick = () => navigate('/repository')

    return (
        <div className="loginContainer">
            <div className="leftSection"></div>
            <div className="rightSection">
                <div className="loginForm">
                    <img src="./src/js/icons/kv-logo.png" alt="logo" />
                    <FormInput type="text" id="username" label="Username" placeHolder="Enter Username" onChange={(value) => onChangeInput("username", value)} />
                    <FormInput type="text" id="password" label="Password" placeHolder="Enter Password" onChange={(value) => onChangeInput("password", value)} />
                    <Button label="Login" handleClick={onLoginClick} />
                </div>
            </div>
        </div>
    );
}

export default Login;