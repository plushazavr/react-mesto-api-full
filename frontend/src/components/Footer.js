import React from 'react';
const currentDate = new Date().getFullYear();

export default function Footer(props) {
    return (
        <footer className="footer">
            {props.loggedIn && <p className="footer__copyright">&copy; {currentDate}</p>}
        </footer>
    );
}