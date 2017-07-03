import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import Gateway from './subcomponents/Gateway';

class App extends React.PureComponent {
  render() {
    const { location } = this.props;
    return (
      <Gateway {...{ location }}>
        {this.props.children}
        <Notification />
      </Gateway>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(App);
