import React from 'react';
import Portal from 'react-portal';

const ModalContent = (props) => {
  return (
    <div className={`modal ${props.modalClass}`}>
      <div className="modal-content">
        {props.children}
      </div>
    </div>
  );
};

class Modal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = { modalClass: '' }

  onOpen = (node) => {
    setTimeout(() => {
      this.setState({ modalClass: 'visible' });
    }, 50);
  }

  beforeClose = (node, close) => {
    this.setState({ modalClass: '' });
    setTimeout(() => {
      close();
    }, 550);
  }

  render() {
    const { modalClass } = this.state;
    return (
      <Portal isOpened={this.props.isOpened} onOpen={this.onOpen} beforeClose={this.beforeClose} closeOnEsc>
        <ModalContent modalClass={modalClass}>
          {this.props.children}
        </ModalContent>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: React.PropTypes.node,
  isOpened: React.PropTypes.bool,
};

export default Modal;
