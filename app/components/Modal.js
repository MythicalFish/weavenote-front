import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Portal from 'react-portal';
import { closeModal } from 'containers/App/actions';
import { selectModalID } from 'containers/App/selectors';
import Icon from 'components/Icon';

class Modal extends React.PureComponent {
  state = { modalClass: '' };

  onOpen = () => {
    setTimeout(() => {
      this.setState({ modalClass: 'visible' });
    }, 50);
  };

  beforeClose = (node, close) => this.closeModal(close);

  closeModal = (cb) => {
    this.setState({ modalClass: '' });
    setTimeout(() => {
      this.props.closeModal();
      if (cb) cb();
    }, 550);
  };

  ModalMarkup = () => {
    const p = this.props;
    const { ModalContent } = this;
    return (
      <div className={`modal ${this.state.modalClass}`}>
        <div
          className="overlay"
          onClick={() => {
            if (!p.noCloseOutside) this.closeModal();
          }}
        />
        <ModalContent />
      </div>
    );
  };

  ModalContent = () => {
    const p = this.props;
    const style = {};
    if (p.width) style.width = p.width;
    if (p.height) style.height = p.height;
    if (p.minWidth) style.minWidth = p.minWidth;
    if (p.maxWidth) style.maxWidth = p.maxWidth;
    if (p.minHeight) style.minHeight = p.minHeight;
    const doClose = () => {
      if (p.closeFunc) {
        p.closeFunc();
      } else {
        this.closeModal();
      }
    };
    return (
      <div className={`modal-content ${this.state.modalClass}`} style={style}>
        <div className="modal-body">
          {!p.hideCloseButton && (
            <Icon
              name="X"
              className="modal-close"
              onClick={doClose}
              size={20}
            />
          )}
          {p.children}
        </div>
        {p.footer && p.footer}
      </div>
    );
  };

  render() {
    const { modalID, id, withoutPortal } = this.props;
    const isOpened = modalID === id;
    const { ModalMarkup } = this;
    if (withoutPortal) return <ModalMarkup>{this.props.children}</ModalMarkup>;
    return (
      <Portal
        isOpened={isOpened}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
        closeOnEsc
      >
        <ModalMarkup>{this.props.children}</ModalMarkup>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  modalID: PropTypes.string,
  id: PropTypes.string,
  closeModal: PropTypes.func,
  withoutPortal: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

const mapState = createStructuredSelector({
  modalID: selectModalID(),
});

export default connect(mapState, mapDispatch)(Modal);
export { ModalMarkup };
