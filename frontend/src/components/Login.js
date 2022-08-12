import React from 'react';

export default function Login(props) {
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onLogin({ email, password });
    }
    return (
        <section className="login">
            <h2 className="login__heading">Вход</h2>
            <form
                className="login__form"
                onSubmit={handleSubmit}>
                <input
                    className="login__input"
                    type="email"
                    name="emailInput"
                    placeholder="Email"
                    required
                    onChange={handleChangeEmail}
                    value={email}
                />
                <input
                    className="login__input"
                    type="password"
                    name="passwordInput"
                    placeholder="Пароль"
                    required
                    onChange={handleChangePassword}
                    value={password}
                />
                <button
                    className="button button_type_submit_auth"
                    type="submit">Войти</button>
            </form>
        </section>
    );
}