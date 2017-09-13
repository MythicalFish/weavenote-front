import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Portal from 'react-portal';
import { closeModal } from 'containers/App/actions';
import { selectModalID } from 'containers/App/selectors';

const ModalMarkup = (props) => {
  const p = props;
  const style = {};
  if (p.minWidth) style.minWidth = p.minWidth;
  const modalClass = p.isOpen ? 'visible' : p.modalClass;
  const modalBGClass = p.isOpen ? 'overlay' : '';
  return (
    <div className={`modal ${modalClass}`}>
      <div className={`modal-bg ${modalBGClass}`} onClick={p.closePortal} />
      <div className="modal-content" style={style}>
        {p.children}
      </div>
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

export function mapDispatch(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

const mapState = createStructuredSelector({
  modalID: selectModalID(),
});

export default connect(mapState, mapDispatch)(Modal);
export { ModalMarkup };
