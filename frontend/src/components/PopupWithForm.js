import React from 'react';

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={props.onClose}
                className="button button_type_close"
                type="button"
                aria-label="Закрыть окно">
        </button>
        <form className="popup__form"
              name={props.name}
              onSubmit={props.onSubmit}
        >
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__input">
            {props.children}
        </fieldset>
        <button className="button button_type_submit" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}