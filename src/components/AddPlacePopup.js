import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setNamePlace] = React.useState("");
  const [link, setLinkPlace] = React.useState("");

  function handleChangeTitle(e) {
    setNamePlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLinkPlace(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setNamePlace("");
    setLinkPlace("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      buttonText="Создать"
      name="add-cards"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        type="text"
        id="card-name"
        className="popup__input popup__input_type_card-name"
        name="card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeTitle}
        value={name || ""}
      />
      <span id="error-cardname" className="error-message"></span>

      <input
        type="url"
        id="card-link"
        className="popup__input popup__input_type_card-link"
        name="card-link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
        value={link || ""}
      />
      <span id="error-cardlink" className="error-message"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
