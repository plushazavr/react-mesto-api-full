import React from 'react';

export default function ImagePopup(props) {
    return (
        <section className={`popup popup_type_open-image ${props.card.link && 'popup_opened'}`}>
            <figure className="popup__window">
                <button
                    className="button button_type_close"
                    type="button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                />
                <img
                    className="popup__image"
                    src={props.card.link}
                    alt={props.card.name}
                />
                <figcaption
                    className="popup__image-title">{props.card.name} </figcaption>
            </figure>
        </section>
    );
}