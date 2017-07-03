import React, { PropTypes } from 'react';
import Portal from 'react-portal';

const ModalContent = (props) =>
  <div className={`modal ${props.modalClass}`}>
    <div className="modal-content">
      {props.children}
    </div>
  </div>;

class Modal extends React.PureComponent {
  state = { modalClass: '' };

  onOpen = (node) => {
    setTimeout(() => {
      this.setState({ modalClass: 'visible' });
    }, 50);
  };

  beforeClose = (node, close) => {
    this.setState({ modalClass: '' });
    setTimeout(() => {
      close();
      this.props.parent.setState({ activeModal: null });
    }, 550);
  };

  render() {
    const { modalClass } = this.state;
    const { parent, modalID } = this.props;
    const isOpened = parent.state.activeModal === modalID;
    return (
      <Portal
        isOpened={isOpened}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
        closeOnEsc
      >
        <ModalContent modalClass={modalClass}>
          {this.props.children}
        </ModalContent>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  parent: PropTypes.object,
  modalID: PropTypes.string,
};

export default Modal;
