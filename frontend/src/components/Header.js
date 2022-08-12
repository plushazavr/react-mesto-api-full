import React from 'react';
import logo from "../images/logo.svg";
import { Route, Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Лого Mesto" />
            {
                props.loggedIn && (
                    <Route exact path="/">
                        <div className="header__user-info">
                            <p className="header__email">{props.email}</p>
                            <Link
                                className="button_type_exit"
                                onClick={props.onLogout}
                                to="/signin">Выйти
                            </Link>
                        </div>
                    </Route>
                )
            }
            <Route path="/signin">
                <Link
                    className="header__link"
                    to="/signup">Регистрация
                </Link>
            </Route>
            <Route path="/signup">
                <Link
                    className="header__link"
                    to="/signin">Войти
                </Link>
            </Route>
        </header>
    );
}