import PopupWithForm from "./PopupWithForm";

const RemoveCardPopup = ({ isOpen, onClose, onConfirmRemove }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onConfirmRemove();
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
      onSubmit={onSubmit}
    />
  );
};

export default RemoveCardPopup;
