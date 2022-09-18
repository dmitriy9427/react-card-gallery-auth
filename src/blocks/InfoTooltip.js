function InfoTooltip(props) {
    return (
      <div className={`popup ${props.isOpen ? 'popup_visible' : ''}`} onClick={props.onCloseClick}>
        <div className="popup__container popup__container_InfoTooltip">
          <img className="popup__status" src={props.image} alt={props.title}/>
          <h2 className="popup__text">{props.title}</h2>
          <button className="popup__closed button" type="button" title="Закрыть" onClick={props.onClose}/>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;