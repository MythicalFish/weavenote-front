import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import ModalImage from 'containers/ImageForm/ModalImage';
import Gateway from './Gateway';
import * as selectors from './selectors';

class App extends React.PureComponent {
  render() {
    const { location, modalImage, modalID, focus } = this.props;
    const showBlur = focus || modalID;
    return (
      <Gateway {...{ location }}>
        {this.props.children}
        {showBlur && <div className="overlay" />}
        <Notification />
        <ModalImage image={modalImage} />
      </Gateway>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  modalImage: PropTypes.object,
  modalID: PropTypes.string,
  focus: PropTypes.string,
};

const mapState = createStructuredSelector({
  modalID: selectors.selectModalID(),
  modalImage: selectors.selectModalImage(),
  focus: selectors.selectFocus(),
});

export default connect(mapState)(App);
