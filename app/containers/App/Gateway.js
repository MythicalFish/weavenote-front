import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import LoginForm from 'components/LoginForm';
import { loggedIn } from 'utils/authUtils';
import { fetchUser, fetchInvite, handleInvite, setInviteKey, initializeOrganization } from './actions';
import * as selectors from './selectors';

class Gateway extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  newInviteKey = () => {
    const { location } = this.props;
    return location.query.invitation;
  }

  storedInviteKey = () => (
    localStorage.getItem('inviteKey')
  )

  render() {

    /*

      1. Store invite key if present in URL
      2. Remove key from URL if present in localStorage
      3. Fetch Invite if key present (for prefilled email address)
      4. Render login if !loggedIn()
      5. Run handleInvite() if key present
      6. Fetch user data if no key present
      7. Redirect to /organization if no organization

    */

    const newKey = this.newInviteKey();
    const storedKey = this.storedInviteKey();

    if (newKey) {
      this.props.setInviteKey(newKey); // 1 & 2
      return null;
    }

    if (!loggedIn()) {
      if (storedKey) {
        const { invite } = this.props;
        if (!invite) {
          this.props.fetchInvite(storedKey); // 3
          return null;
        } else {
          return <LoginForm {...this.props} />; // 4
        }
      } else {
        return <LoginForm {...this.props} />; // 4
      }
    }

    if (storedKey) {
      this.props.handleInvite(storedKey); // 5
      return null;
    }

    if (!this.props.user) {
      this.props.fetchUser();
      return null;
    }

    if (!this.props.organization) {
      this.props.initializeOrganization();
      return null;
    }

    return this.props.children;

  }
}

Gateway.propTypes = {
  children: PropTypes.node,
  fetchUser: PropTypes.func,
  setInviteKey: PropTypes.func,
  initializeOrganization: PropTypes.func,
  handleInvite: PropTypes.func,
  fetchInvite: PropTypes.func,
  location: PropTypes.object,
  invite: PropTypes.object,
  user: PropTypes.object,
  organization: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchUser, fetchInvite, handleInvite, setInviteKey, initializeOrganization },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
  organization: selectors.selectCurrentOrg(),
  invite: selectors.selectInvite(),
});

export default connect(mapState, mapDispatch)(Gateway);
