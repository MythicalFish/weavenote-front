import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Auth from 'containers/Auth';
import { loggedIn } from 'utils/authUtils';
import AppLayout from 'components/AppLayout';
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
      return <AppLayout {...this.props} />;
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
  return bindActionCreators(
    { fetchUser },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  org: selectors.selectOrgs(),
  currentOrg: selectors.selectCurrentOrg(),
});

export default connect(mapState, mapDispatch)(App);
