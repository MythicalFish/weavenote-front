import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Auth from 'containers/Auth';
import Organization from 'containers/Organization';
import { loggedIn } from 'utils/authUtils';
import AppLayout from 'components/AppLayout';
import { fetchUser } from './actions';
import * as selectors from './selectors';


class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (loggedIn()) this.props.fetchUser();
  }

  render() {
    const { user, currentOrganization, location } = this.props;
    if (!loggedIn()) return <Auth />;
    if (!user) return null;
    if (!currentOrganization && location.pathname !== '/organization') {
      browserHistory.push('/organization');
      return <Organization />;
    }
    return <AppLayout {...this.props} />;
  }
}

App.propTypes = {
  fetchUser: React.PropTypes.func,
  user: React.PropTypes.object,
  location: React.PropTypes.object,
  currentOrganization: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchUser },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  organizations: selectors.selectOrgs(),
  currentOrganization: selectors.selectCurrentOrg(),
});

export default connect(mapState, mapDispatch)(App);
