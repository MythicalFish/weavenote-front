import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import Gateway from './subcomponents/Gateway';
import ModalImage from './subcomponents/ModalImage';
import Blur from './subcomponents/Blur';
import * as selectors from './selectors';

const App = (props) => {
  const { location, modalImage } = props;
  return (
    <Gateway {...{ location }}>
      <Blur {...props}>
        {props.children}
      </Blur>
      <Notification />
      <ModalImage image={modalImage} />
    </Gateway>
  );
};

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  modalImage: PropTypes.object,
};

const mapState = createStructuredSelector({
  modalID: selectors.selectModalID(),
  modalImage: selectors.selectModalImage(),
  focus: selectors.selectFocus(),
});

export default connect(mapState)(App);
