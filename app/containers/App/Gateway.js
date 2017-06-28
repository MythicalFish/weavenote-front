import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import LoginForm from 'components/LoginForm';
import { loggedIn } from 'utils/authUtils';
import { fetchUser, fetchInvite, acceptInvite } from './actions';
import * as selectors from './selectors';

class Gateway extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  newInviteKey = () => {
    const { location } = this.props;
    return location.query.invitation;
  }

  storedInviteKey = () => {
    return localStorage.getItem('inviteKey');
  }

  storeNewInviteKey = (key) => {
    localStorage.setItem('inviteKey', key);
  }

  handleInvite = () => {
    const key = this.inviteKey();
    const { invite } = this.props;
    if (key) {
      if (!invite) {
        this.props.fetchInvite(key);
      } else if (loggedIn() && invite) {
        this.props.acceptInvite(key);
      }
    }
  }

  hasOrCreatingOrganization = () => {
    const { organization } = this.props;
    const { pathname: path } = location;
    if (organization || path === '/organization') {
      return true;
    } else {
      return false;
    }
  }

  render() {

    /*

      1. Store invite key if present in URL
      2. Remove key from URL if present in localStorage
      3. Fetch Invite if key present (for prefilled email address)
      4. Render login if !loggedIn()
      5. Run acceptInvite() if key present
      6. Fetch user data afterwards (same saga as point 4)
      7. Redirect to /organization if no organization

    */

    const newKey = this.newInviteKey();
    const storedKey = this.storedInviteKey();

    if (newKey) {
      this.storeNewInviteKey(newKey); // 1
      browserHistory.push('/'); // 2
      return null;
    }

    if (!loggedIn()) {
      if (storedKey) {
        this.props.fetchInvite(storedKey); // 3
        const { invite } = this.props;
        if (invite) {
          return <LoginForm {...this.props} />; // 4
        } else {
          return null;
        }
      } else {
        return <LoginForm {...this.props} />; // 4
      }
    }

    if (storedKey) {
      this.props.handleInvite(storedKey); // 4
    }

    
    else {
      return this.props.children;
    } else {
      return null;
    }
  }
}

Gateway.propTypes = {
  children: PropTypes.node,
  fetchUser: PropTypes.func,
  acceptInvite: PropTypes.func,
  fetchInvite: PropTypes.func,
  location: PropTypes.object,
  invite: PropTypes.object,
  user: PropTypes.object,
  organization: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchUser, fetchInvite, acceptInvite },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  organization: selectors.selectCurrentOrg(),
  invite: selectors.selectInvite(),
});

export default connect(mapState, mapDispatch)(Gateway);
