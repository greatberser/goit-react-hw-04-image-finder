import { Component } from "react";
import disableScroll from 'disable-scroll';

export class Modal extends Component {
  handleCloseModal = (evt) => {
    if (evt.code === "Escape" || evt.target === evt.currentTarget) {
      const { onCloseModal } = this.props;
      onCloseModal(); 
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleCloseModal);
    disableScroll.on();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseModal);
    disableScroll.off();
  }

  render() {
    const { imgSrc, imgAlt } = this.props;

    return (
      <div className="Overlay" onClick={this.handleCloseModal}>
        <div className="Modal">
          <img src={imgSrc} alt={imgAlt} />
        </div>
      </div>
    );
  }
}
