import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Portal from 'react-portal';
import { closeModal } from 'containers/App/actions';
import { selectModalID } from 'containers/App/selectors';
import Icon from 'components/Icon';

const ModalContent = (props) => {
  const p = props;
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
      p.closeModal();
    }
  };
  return (
    <div className={`modal-content ${p.modalClass}`} style={style}>
      <div className="modal-body">
        {!p.hideCloseButton && (
          <Icon name="X" className="modal-close" onClick={doClose} size={20} />
        )}
        {p.children}
      </div>
      {p.footer && p.footer}
    </div>
  );
};

const ModalMarkup = (props) => {
  const p = { ...props };
  if (p.modalClass === undefined) p.modalClass = 'visible';
  return (
    <div className={`modal ${p.modalClass}`}>
      <div
        className="overlay"
        onClick={() => {
          if (!p.noCloseOutside) p.closeModal();
        }}
      />
      <ModalContent {...p} />
    </div>
  );
};

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

  Markup = ({ children }) => {
    const mProps = {
      ...this.props,
      modalClass: this.state.modalClass,
      closeModal: this.closeModal,
    };
    return <ModalMarkup {...mProps}>{children}</ModalMarkup>;
  };

  render() {
    const { modalID, id, withoutPortal } = this.props;
    const isOpened = modalID === id;
    const { Markup } = this;
    if (withoutPortal) return <Markup>{this.props.children}</Markup>;
    return (
      <Portal
        isOpened={isOpened}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
        closeOnEsc
      >
        <Markup>{this.props.children}</Markup>
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
