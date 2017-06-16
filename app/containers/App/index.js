import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import LoginForm from 'components/LoginForm';
import Notification from 'containers/Notification';
import { loggedIn } from 'utils/authUtils';
import Layout from './Layout';
import { fetchUser, retrieveInvite, acceptInvite } from './actions';
import * as selectors from './selectors';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (loggedIn()) this.props.fetchUser();
    this.handleInvite();
  }

  componentWillUpdate() {
    setTimeout(() => {
      this.handleInvite();
    }, 200);
  }

  inviteKey = () => {
    const { invitation: key } = this.props.location.query;
    if (key) { localStorage.setItem('inviteKey', key); }
    const k = localStorage.getItem('inviteKey');
    return k || false;
  }

  handleInvite = () => {
    const key = this.inviteKey();
    const { invite } = this.props;
    if (key) {
      if (!invite) {
        this.props.retrieveInvite(key);
      } else if (loggedIn() && invite) {
        this.props.acceptInvite(key);
      }
    }
  }

  render() {
    const { organization, invite } = this.props;
    if (!loggedIn()) {
      return <LoginForm {...this.props} />;
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
  acceptInvite: React.PropTypes.func,
  retrieveInvite: React.PropTypes.func,
  location: React.PropTypes.object,
  invite: React.PropTypes.object,
  user: React.PropTypes.object,
  organization: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchUser, retrieveInvite, acceptInvite },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  organization: selectors.selectCurrentOrg(),
  invite: selectors.selectInvite(),
});

export default connect(mapState, mapDispatch)(App);
