import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import Layout from './Layout';
import Gateway from './Gateway';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Gateway>
          <Layout {...this.props} />
        </Gateway>
        <Notification />
      </div>
    );
  }
}

App.propTypes = {
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { },
    dispatch
  );
}

const mapState = createStructuredSelector({
});

export default connect(mapState, mapDispatch)(App);
