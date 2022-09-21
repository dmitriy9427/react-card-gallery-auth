import React from "react";

function ImagePopup({ card, isOpen, onClose })
{
    return (
        <div className={`popup popup-image popup_type_image${isOpen ? ' popup_opened' : ''}`} onMouseDown={onClose}>
            <div className='popup__image-container'>
                <img
                    className='popup__open-image'
                    src={card.link} alt={card.name}
                />
                <p className='popup__image-caption'>{card.name}</p>
                <button
                    className='popup__close popup__close_type_image'
                    type='button'
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default ImagePopup;