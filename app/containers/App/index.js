import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import Gateway from './subcomponents/Gateway';
import ModalImage from './subcomponents/ModalImage';
import * as selectors from './selectors';

class App extends React.PureComponent {
  render() {
    const { location, modalImage } = this.props;
    return (
      <Gateway {...{ location }}>
        {this.props.children}
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
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({
  modalImage: selectors.selectModalImage(),
});

export default connect(mapState, mapDispatch)(App);
