import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Portal from 'react-portal';
import { closeModal } from 'containers/App/actions';
import { selectModalID } from 'containers/App/selectors';
import ModalLayout from './ModalLayout';

class Modal extends React.PureComponent {
  state = { modalClass: '' };

  onOpen = () => {
    setTimeout(() => {
      this.setState({ modalClass: 'visible' });
    }, 50);
  };

  beforeClose = (node, closePortal) => this.handleClose(closePortal);

  handleClose = (closePortal) => {
    this.setState({ modalClass: '' });
    setTimeout(() => {
      this.props.closeModal();
      if (closePortal) closePortal();
    }, 550);
  };

  render() {
    const { modalID, id } = this.props;
    const { modalClass } = this.state;
    const { handleClose } = this;
    const isOpened = modalID === id;
    return (
      <Portal
        isOpened={isOpened}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
        closeOnEsc
      >
        <ModalLayout
          {...{
            ...this.props,
            modalClass,
            handleClose,
          }}
        >
          {this.props.children}
        </ModalLayout>
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
