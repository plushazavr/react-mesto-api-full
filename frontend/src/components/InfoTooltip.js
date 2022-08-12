import React from 'react';


export default function InfoTooltip(props) {
    return (
        <div
            className={`popup ${props.isOpen && "popup_opened"}`}>
            <div
                className="popup__container popup__container_type_message">
                <button
                    className="button button_type_close"
                    type="button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                />
                <img
                    className="popup__icon"
                    src={props.image}
                    alt="Статус"
                />
                <h2 className="popup__message">{props.title}</h2>
            </div>
        </div>
    )
}