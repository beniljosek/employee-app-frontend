import React from 'react';

import './styles.scss';

const Dropdown = ({
    label,
    onChange,
    options,
    placeHolder,
}) => {
    return (
        <div className="selectContainer">
            <span className="label">{label}</span>
            <select className="inputField" onChange={onChange} placeholder={placeHolder}>
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