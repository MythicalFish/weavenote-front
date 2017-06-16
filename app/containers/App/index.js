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
    const { invitation: key } = this.props.location.query;
    if (key) {
      this.acceptInvitation(key);
    }
  }

  componentWillUpdate() {
    if (loggedIn() && !this.props.user) this.props.fetchUser();
  }

  acceptInvitation = (key) => {
    console.log(key);
  }

  render() {
    const { organization } = this.props;
    if (!loggedIn()) {
      return <Auth />;
    } else if (organization || location.pathname === '/organization') {
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
  location: React.PropTypes.object,
  user: React.PropTypes.object,
  organization: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  organization: selectors.selectCurrentOrg(),
});

export default connect(mapState, mapDispatch)(App);
