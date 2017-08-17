import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import Gateway from './subcomponents/Gateway';
import ModalImage from './subcomponents/ModalImage';
import Blur from './subcomponents/Blur';
import * as selectors from './selectors';

class App extends React.PureComponent {
  componentDidMount = () => {
    document.body.addEventListener('click', () => {
      // TODO: close dropdown
    });
  };
  render() {
    const { location, modalImage } = this.props;
    return (
      <Gateway {...{ location }}>
        <Blur {...this.props}>
          {this.props.children}
        </Blur>
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
  modalID: selectors.selectModalID(),
  modalImage: selectors.selectModalImage(),
  focus: selectors.selectFocus(),
});

export default connect(mapState, mapDispatch)(App);
