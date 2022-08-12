//const BASE_URL = 'https://api.kazantseva.nomoredomains.sbs';
//const BASE_URL = 'https://mesto.nomoreparties.co/v1/cohort-40';
//const BASE_URL = 'http://localhost:3000';

class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => this._getResponse(res))
    }

    getInitialCards() {
        return fetch (`${this.baseUrl}/cards`, {
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => this._getResponse(res))
    }

    editUserData({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            }),
            credentials: 'include',
        })
            .then(res => this._getResponse(res))
    }

    postNewCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards `, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            }),
            credentials: 'include',
        })
            .then(res => this._getResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => this._getResponse(res))
    }

    changeUserAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            }),
            credentials: 'include',
        })
            .then(res => this._getResponse(res))
    }

    _getResponse(res) {
        if (res.ok) {
            return(res.json());
        } else {
            return res.json()
              .then((err) => {
                  throw new Error(err.message);
              })
        }
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this.headers,
                credentials: 'include',
            })
                .then(res => this._getResponse(res));
        } else {
            return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this.headers,
                credentials: 'include',
            })
                .then(res => this._getResponse(res));
        }
    }
}

const api = new Api({
    baseUrl: 'https://api.kazantseva.nomoredomains.sbs',
    headers: {
      //authorization: '9e2d1a56-de8f-4b7e-b67f-fb6ac953a442',
      'Content-Type': 'application/json'
    }
});

export default api;
