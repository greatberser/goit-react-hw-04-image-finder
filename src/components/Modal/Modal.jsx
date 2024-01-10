import React, { useEffect } from "react";
import disableScroll from 'disable-scroll';

export const Modal = ({ imgSrc, imgAlt, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === "Escape") {
        onCloseModal(); 
      }
    };

    
    window.addEventListener("keydown", handleKeyDown);
    disableScroll.on();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      disableScroll.off();
    };
  }, [onCloseModal]);

  const handleClickOutside = (evt) => {
    if (evt.target === evt.currentTarget) {
      onCloseModal(); 
    }
  };
  

  return (
    <div className="Overlay" onClick={handleClickOutside}>
      <div className="Modal">
        <img src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  );
};

export default Modal;
