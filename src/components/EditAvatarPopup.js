import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      containerClass="popup__avatar-container"
    >
      <input
        type="url"
        id="avatar-link-input"
        className="popup__input popup__input_type_update-avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span id="error-avatar-link-input" className="error-message"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
