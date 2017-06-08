import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Auth from 'containers/Auth';
import Notification from 'containers/Notification';
import { loggedIn } from 'utils/authUtils';
import Layout from './Layout';
import { fetchUser } from './actions';
import * as selectors from './selectors';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (loggedIn()) this.props.fetchUser();
  }

  render() {
    const { currentOrg } = this.props;
    if (!loggedIn()) {
      return <Auth />;
    } else if (currentOrg || location.pathname === '/organization') {
      return (
        <div>
          <Layout {...this.props} />
          <Notification />
        </div>
      );
    }
    return null;
  }
}

App.propTypes = {
  fetchUser: React.PropTypes.func,
  user: React.PropTypes.object,
  location: React.PropTypes.object,
  currentOrg: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  org: selectors.selectOrgs(),
  currentOrg: selectors.selectCurrentOrg(),
});

export default connect(mapState, mapDispatch)(App);
