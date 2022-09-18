import React from "react";

function ImagePopup({ card, onClose })
{
    return (
        <div className={`popup popup-image popup_type_image ${card.link && 'popup_opened'}`}>
            <div className='popup__image-container'>
                <img
                    className='popup__open-image'
                    src={`${card.link}`}
                    alt={card.name}
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