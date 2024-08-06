import React from "react";

import Button from "../button/button";

import './styles.scss';

const DeleteEmployeeDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="deleteBackground">
            <div className="deleteDialogContainer">
                <div className="header">
                    <img src="icons/close.svg" alt="close" className="closeButtton" role="presentation" onClick={onClose} />
                </div>
                <div className="textWrapper">
                    <span className="mainText">Are you sure ?</span>
                    <span className="subText">Do you really want to delete this employee ?</span>
                </div>
                <div className="buttonsContainer">
                    <Button handleClick={onConfirm} label="Confirm" />
                    <Button handleClick={onClose} label="Cancel" variant="secondary" />
                </div>
            </div>
        </div>
    );

};

export default DeleteEmployeeDialog;
