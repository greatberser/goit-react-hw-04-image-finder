import React, { useEffect, useCallback } from "react";
import disableScroll from 'disable-scroll';

export const Modal = ({ imgSrc, imgAlt, onCloseModal }) => {
  const handleCloseModal = useCallback((evt) => {
    if (evt.code === "Escape" || evt.target === evt.currentTarget) {
      onCloseModal(); 
    }
  }, [onCloseModal]);

  useEffect(() => {
    const handleKeyDown = (evt) => handleCloseModal(evt);
    window.addEventListener("keydown", handleKeyDown);
    disableScroll.on();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      disableScroll.off();
    };
  }, [handleCloseModal]);

  return (
    <div className="Overlay" onClick={handleCloseModal}>
      <div className="Modal">
        <img src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  );
};

export default Modal;
