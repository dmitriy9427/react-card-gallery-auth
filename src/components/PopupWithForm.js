function PopupWithForm({
  name,
  containerClass,
  title,
  isOpen,
  buttonText,
  onClose,
  onSubmit,
  children
})
{
  return (
    <section
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className={`popup__container ${containerClass}`}>
        <button
          aria-label="закрыть"
          className="popup__close"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            name={`${name}`}
            className="popup__save-btn button">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;