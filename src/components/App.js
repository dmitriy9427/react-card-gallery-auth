import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from './ImagePopup';
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { registerUser, loginUser, getToken } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import error from "../images/error.svg";
import success from "../images/success.svg";

function App()
{
    const navigate = useNavigate();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    const [cards, setCards] = useState([]);

    const [selectedCard, setCardOpen] = useState({});

    const [currentUser, setCurrentUser] = useState({});


    const [loggedIn, setLoggedIn] = useState(false);
    const [emailName, setEmailName] = useState(null);
    const [popupImage, setPopupImage] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
        useState(false);

    function onLogin(email, password)
    {
        loginUser(email, password)
            .then((res) =>
            {
                localStorage.setItem("jwt", res.token);
                setLoggedIn(true);
                setEmailName(email);
                navigate("/");
            })
            .catch(() =>
            {
                setPopupImage(error);
                setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
                handleInfoTooltipClick();
            });
    }

    function onRegister(email, password)
    {
        registerUser(email, password)
            .then(() =>
            {
                setPopupImage(success);
                setPopupTitle("Вы успешно зарегистрировались!");
                navigate("/sign-in");
            })
            .catch(() =>
            {
                setPopupImage(error);
                setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
            })
            .finally(handleInfoTooltipClick);
    }

    React.useEffect(() =>
    {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getToken(jwt)
                .then((res) =>
                {
                    if (res) {
                        setLoggedIn(true);
                        setEmailName(res.data.email);
                        navigate("/");
                    }
                })
                .catch(console.log);
        }
    }, [navigate]);

    React.useEffect(() =>
    {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([userData, cards]) =>
            {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch(console.log);
    }, []);

    function onSignOut()
    {
        setLoggedIn(false);
        setEmailName(null);
        navigate("/sign-in");
        localStorage.removeItem("jwt");
    }

    //функции открытия попапов
    function handleEditAvatarClick()
    {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick()
    {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick()
    {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card)
    {
        setCardOpen(card);
    }

    function handleInfoTooltipClick()
    {
        setIsInfoTooltipPopupOpen(true);
    }

    function closeAllPopups()
    {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
        setCardOpen({});
    }

    function handleCardLike(card)
    {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) =>
        {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        });
    }

    function handleCardDelete(card)
    {
        api
            .deleteCard(card._id)
            .then(() =>
                setCards((state) => state.filter((c) => c._id !== card._id && c))
            )
            .catch(console.log);
    }

    function handleUpdateUser(user)
    {
        api
            .editProfile(user.name, user.about)
            .then((editUserInfo) =>
            {
                setCurrentUser({
                    ...currentUser,
                    name: editUserInfo.name,
                    about: editUserInfo.about,
                });
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleUpdateAvatar(data)
    {
        api
            .changeAvatar(data.avatar)
            .then((res) =>
            {
                setCurrentUser({
                    ...currentUser,
                    avatar: res.avatar,
                });
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleAddNewCard(card)
    {
        api
            .addNewCard(card.name, card.link)
            .then((newCard) =>
            {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.log);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route
                        path="/sign-in"
                        element={
                            <>
                                <Header title="Регистрация" route="/sign-up" />
                                <Login onLogin={onLogin} />
                            </>
                        }
                    />

                    <Route
                        path="/sign-up"
                        element={
                            <>
                                <Header title="Войти" route="/sign-in" />
                                <Register onRegister={onRegister} />
                            </>
                        }
                    />

                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Header
                                    title="Выйти"
                                    mail={emailName}
                                    onClick={onSignOut}
                                    route=""
                                />
                                <ProtectedRoute
                                    component={Main}
                                    isLogged={loggedIn}
                                    onEditProfile={handleEditProfileClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                                <Footer />
                            </>
                        }
                    />

                    <Route
                        path="*"
                        element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
                    />
                </Routes>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddNewCard}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <InfoTooltip
                    image={popupImage}
                    title={popupTitle}
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
