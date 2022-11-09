class Api {
  constructor({ Url, headers }) {
    this._headers = headers;
    this._Url = Url;
  }

  //проверка ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  //получение данных профиля
  getProfile() {
    return fetch(`${this._Url}/users/me`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  //получение карточек
  getInitialCards() {
    return fetch(`${this._Url}/cards`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  //редактирование профиля
  editProfile(name, about) {
    return fetch(`${this._Url}/users/me`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  //добавление новых карточек
  addNewCard(name, link) {
    return fetch(`${this._Url}/cards`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  //удаление карточек
  deleteCard(id) {
    return fetch(`${this._Url}/cards/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  //удаление и постановка лайков
  changeLikeCardStatus(id, likeStatus) {
    return fetch(`${this._Url}/cards/${id}/likes`, {
      credentials: "include",
      method: likeStatus ? "PUT" : "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  //редактирование аватара
  changeAvatar(link) {
    return fetch(`${this._Url}/users/me/avatar`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ avatar: link }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  Url: "https://domainname.ryabov1994.nomoredomains.icu",
});
