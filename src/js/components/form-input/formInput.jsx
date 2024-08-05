import React from 'react';

import './styles.scss';

const FormInput = ({
    disabled = false,
    label,
    onChange,
    placeHolder,
    type,
    value
}) => {
    return (
        <div className="formInputContainer">
            <span className="label">{label}</span>
            <input
                className={`inputField ${disabled ? 'disabled' : ''}`}
                disabled={disabled}
                type={type}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeHolder}
                value={value}
            />
        </div>
    );
};
export default FormInput;