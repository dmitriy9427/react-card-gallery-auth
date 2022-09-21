import React from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
})
{
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button
                    type="button"
                    aria-label="Обновить аватар"
                    onClick={onEditAvatar} title="Обновить аватар"
                    className="profile__edit"
                >
                    <img
                        src={currentUser.avatar}
                        alt="аватар"
                        className="profile__image"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button
                        type="button"
                        onClick={onEditProfile}
                        aria-label="Редактировать профиль"
                        title="Редактировать профиль"
                        className="profile__edit-btn"
                    >
                    </button>
                </div>
                <button
                    type="button"
                    onClick={onAddPlace}
                    aria-label="Добавить новую фотографию"
                    title="Добавить новую фотографию"
                    className="profile__add-btn"></button>
            </section>
            <section className="elements">
                <ul className="elements__items">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}
export default Main;