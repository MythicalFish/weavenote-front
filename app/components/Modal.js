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
    <div className="modal-content" style={style}>
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
  const p = props;
  const modalClass = p.isOpen ? 'visible' : p.modalClass;
  const modalBGClass = p.isOpen ? 'overlay' : '';
  return (
    <div className={`modal ${modalClass}`}>
      <div
        className={`modal-bg ${modalBGClass}`}
        onClick={() => {
          if (!p.noCloseOutside) p.closeModal();
        }}
      />
      <ModalContent {...props} />
    </div>
  );
};

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
      this.props.closeModal();
    }, 550);
  };

  render() {
    const { modalID, id } = this.props;
    const isOpened = modalID === id;
    return (
      <Portal
        isOpened={isOpened}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
        closeOnEsc
      >
        <ModalMarkup {...this.props} {...this.state}>
          {this.props.children}
        </ModalMarkup>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  modalID: PropTypes.string,
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
ModalMarkup.propTypes = {
  hideCloseButton: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

const mapState = createStructuredSelector({
  modalID: selectModalID(),
});

export default connect(mapState, mapDispatch)(Modal);
export { ModalMarkup };
