import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
      `button button_type_delete ${isOwn ? '' : 'button button_type_delete_hidden'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `button_type_like ${isLiked ? 'button_type_like_active' : ''}`
    );

    function handleCardClick() {
        props.onCardClick(props.card);
    }
    
    function handleLikeClick () {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
      <article className="element">
        <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить" onClick={handleDeleteClick}></button>
        <img onClick={handleCardClick}
          alt={`Изображение ${props.name}`}
          className="element__image"
          src={props.link}/>
        <div className="element__caption">
          <h2 className="element__title">{props.name}</h2>
          <div className="element__like-container">
            <button type="button" className={cardLikeButtonClassName} aria-label="Понравилось" onClick={handleLikeClick}></button>
            <span className="element__like-counter">{props.likes.length}</span>
          </div>            
        </div>
        </article>
      );
    }