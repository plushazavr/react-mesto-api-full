import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from "./Header.js";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import InfoTooltip from "./InfoTooltip";
import BurgerMenu from './BurgerMenu';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import doneIcon from '../images/done.svg'
import errorIcon from '../images/error.svg'
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [removedCard, setRemovedCard] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [infoTooltipImage, setInfoTooltipImage] = React.useState('');
    const [email, setEmail] = React.useState('');
    const history = useHistory();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const onMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCookiesCheck = React.useCallback(() => {
        auth.cookiesCheck()
            .then((res) => {
                if (res.message === 'Unauthorized') {
                    setLoggedIn(false);
                    setEmail('');
                    history.push('/signin');
                } else if (res.message === 'OK') {
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch((err) => {
                setLoggedIn(false);
                console.log(err.message);
            })
    }, [history]);

    React.useEffect(() => {
        handleCookiesCheck()
    }, [handleCookiesCheck]);

    React.useEffect(() => {
        if (loggedIn) {
            
        }
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then((values) => {
                const [userData, initialCards] = values;
                setCurrentUser(userData);
                setCards(initialCards);
                setEmail(userData.email);
                history.push('/');
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            });
    }, [history, loggedIn]);

    function handleRegister(data) {
        auth.register(data)
            .then((res) => {
                if (res.email) {
                    history.push('/signin');
                    setStatus('Вы успешно зарегистрировались!');
                    setInfoTooltipImage(doneIcon);
                    setInfoTooltipOpen(true);
                }
            })
            .catch((err) => {
                setStatus('Что-то пошло не так!');
                setInfoTooltipImage(errorIcon);
                setInfoTooltipOpen(true);
                console.log(`Ошибка: ${err.message}!`);
            })
    }

    function handleLogin(data) {
        auth.login(data)
            .then(() => {
                setLoggedIn(true);
                setEmail(data.email);
                history.push('/');
            })
            .catch((err) => {
                setStatus('Что-то пошло не так!');
                setInfoTooltipImage(errorIcon);
                setInfoTooltipOpen(true);
                console.log(`Ошибка: ${err.message}!`);
            });
    }

    function handleLogout() {
        auth.logout()
            .then(() => {
                setLoggedIn(false);
                setEmail('');
                history.push('/signin');
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            })
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            });
    }

    function handleCardDeleteClick(card) {
        setIsConfirmPopupOpen(true);
        setRemovedCard(card);
    }

    function handleCardDelete(card) {
        setIsLoading(true);
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
                closeAllPopups();
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmPopupOpen(false);
        setInfoTooltipOpen(false);
        setSelectedCard({});
        setInfoTooltipImage('');
        setStatus('');
    }

    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    }

    function handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function handleUpdateUser(currentUser) {
        setIsLoading(true);
        api.editUserData(currentUser)
            .then((data) => {
                setCurrentUser(data);
                setIsLoading(false);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.changeUserAvatar(data)
            .then((userData) => {
                setCurrentUser(userData);
                setIsLoading(false);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit({name, link}) {
        setIsLoading(true);
        api.postNewCard({name, link})
            .then((newCard) => {
                setCards([...cards, newCard]);
                setIsLoading(false);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        document.addEventListener('mouseup', handleOverlayClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
            document.removeEventListener('mouseup', handleOverlayClose);
        }
    });

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className={`page ${isMobileMenuOpen &&'page_type_mobile_opened'} ${
            !loggedIn && 'page_type_mobile__hidden'
            }`}>
                <div className="container">
                    <BurgerMenu onLogout={handleLogout} userEmail={email}/>
                    <Header loggedIn={loggedIn} email={email} onLogout={handleLogout} onMobileMenuClick={onMobileMenuClick}/>
                    <Switch>
                        <Route path="/signin">
                            <Login onLogin={handleLogin}/>
                        </Route>

                        <Route path="/signup">
                            <Register onRegister={handleRegister}/>
                        </Route>

                        <ProtectedRoute
                            exact path="/"
                            component={Main}
                            loggedIn={loggedIn}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={setSelectedCard}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDeleteClick}
                        />
                    </Switch>
                    <Footer loggedIn={loggedIn}/>


                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={isLoading}
                    />

                    <ConfirmPopup
                        isOpen={isConfirmPopupOpen}
                        onClose={closeAllPopups}
                        onConfirm={handleCardDelete}
                        card={removedCard}
                        isLoading={isLoading}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />

                    <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        onClose={closeAllPopups}
                        image={infoTooltipImage}
                        title={status}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;