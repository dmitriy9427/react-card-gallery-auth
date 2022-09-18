import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "../components/PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("Name");
  const [description, setDescription] = React.useState("About");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handlechangeAbout(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      buttonText="Сохранить"
      name="profile-edit"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="username"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        name="name"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
        required
      />
      <span className="error-message"></span>

      <input
        type="text"
        id="profession-input"
        className="popup__input popup__input_type_job"
        placeholder="Занятие"
        name="about"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handlechangeAbout}
        required
      />
      <span className="error-message"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
