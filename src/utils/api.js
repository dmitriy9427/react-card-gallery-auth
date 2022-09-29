class Api  
    {
    constructor({ baseUrl, headers })
{
    this._headers = headers;
    this._baseUrl = baseUrl;
}

//проверка ответа от сервера
_checkResponse(res)
{
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

//получение данных профиля
getProfile()
{
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
    }).then(this._checkResponse);
}

//получение карточек
getInitialCards()
{
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
    }).then(this._checkResponse);
}

//редактирование профиля
editProfile(name, about)
{
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name,
            about,
        }),
    }).then(this._checkResponse);
}

//добавление новых карточек
addNewCard(name, link)
{
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name,
            link,
        }),
    }).then(this._checkResponse);
}

//удаление карточек
deleteCard(id)
{
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then(this._checkResponse);
}

//удаление и постановка лайков
changeLikeCardStatus(id, likeStatus)
{
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: likeStatus ? "PUT" : "DELETE",
        headers: this._headers,
    }).then(this._checkResponse);
}

//редактирование аватара
changeAvatar(link)
{
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: link }),
    }).then(this._checkResponse);
}
}


export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
    headers: {
        authorization: "713e9fcb-7164-40b1-8a98-089d93e7cbcd",
        "Content-Type": "application/json",
    },
});
