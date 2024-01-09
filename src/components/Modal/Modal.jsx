import React, { useEffect } from "react";
import disableScroll from 'disable-scroll';

export const Modal = ({ imgSrc, imgAlt, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === "Escape") {
        onCloseModal(); 
      }
    };

    const handleClickOutside = (evt) => {
      if (evt.target === evt.currentTarget) {
        onCloseModal(); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);
    disableScroll.on();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
      disableScroll.off();
    };
  }, [onCloseModal]);

  return (
    <div className="Overlay" onClick={onCloseModal}>
      <div className="Modal">
        <img src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  );
};

export default Modal;
