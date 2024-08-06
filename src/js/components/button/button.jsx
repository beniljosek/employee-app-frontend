import React from "react";

import './styles.scss';

const Button = ({ handleClick, label, variant }) => {
    return (
        <button className={`button ${variant}`} onClick={() => handleClick()}>{label}</button>
    );
}
export default Button;