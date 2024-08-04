import React from 'react';

import './styles.scss';

const FormInput = ({
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
                className="inputField"
                value={value}
                type={type}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeHolder}
            />
        </div>
    );
};
export default FormInput;