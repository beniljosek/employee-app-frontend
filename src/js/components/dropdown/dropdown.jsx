import React from 'react';

import './styles.scss';

const Dropdown = ({
    label,
    onChange,
    options,
    placeHolder,
    value
}) => {
    return (
        <div className="selectContainer">
            <span className="label">{label}</span>
            <select className="inputField" onChange={(e) => onChange(e.target.value)} placeholder={placeHolder} value={value}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <br />
        </div>
    );
};

export default Dropdown;