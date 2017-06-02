import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Auth from 'containers/Auth';
import { loggedIn } from 'utils/authUtils';
import AppLayout from 'components/AppLayout';
import { fetchUser } from './actions';
import * as selectors from './selectors';


class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (loggedIn()) this.props.fetchUser();
  }

  render() {
    const { user, currentOrganization } = this.props;
    if (!loggedIn()) return <Auth />;
    if (!user) return null;
    if (!currentOrganization) browserHistory.push('/organizations/new');
    return <AppLayout {...this.props} />;
  }
}

App.propTypes = {
  fetchUser: React.PropTypes.func,
  user: React.PropTypes.object,
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
  organizations: selectors.selectOrganizations(),
  currentOrganization: selectors.selectCurrentOrganization(),
});

export default connect(mapState, mapDispatch)(App);
