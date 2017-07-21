import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Portal from 'react-portal';
import { closeModal } from 'containers/App/actions';
import { selectCurrentModalID } from 'containers/App/selectors';

const PseudoModal = (props) => {
  const p = props;
  const style = {};
  if (p.minWidth) style.minWidth = p.minWidth;
  return (
    <div className={`modal ${p.modalClass}`}>
      <div className="modal-bg" onClick={p.closePortal} />
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
    const { modalID, currentModalID } = this.props;
    const isOpened = currentModalID === modalID;
    return (
      <Portal
        isOpened={isOpened}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
        closeOnEsc
      >
        <PseudoModal {...this.props} {...this.state}>
          {this.props.children}
        </PseudoModal>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  minWidth: PropTypes.string,
  modalID: PropTypes.string,
  currentModalID: PropTypes.string,
  closeModal: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

const mapState = createStructuredSelector({
  currentModalID: selectCurrentModalID(),
});

export default connect(mapState, mapDispatch)(Modal);
